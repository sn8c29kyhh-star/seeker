// Real local Supabase Auth + PostgREST + database policies. Never targets hosted projects.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {randomUUID} from 'node:crypto';
const settings=JSON.parse(execFileSync('supabase',['status','-o','json'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}));
const base=settings.API_URL;
assert.match(base,/^http:\/\/(127\.0\.0\.1|localhost):/);
const key=settings.ANON_KEY;const admin=settings.SERVICE_ROLE_KEY;
const suffix=randomUUID();const users=[];
async function request(path,{token=key,method='GET',body}={}){
 const response=await fetch(base+path,{method,headers:{apikey:key,Authorization:`Bearer ${token}`,'Content-Type':'application/json',Prefer:'return=representation'},body:body===undefined?undefined:JSON.stringify(body)});
 const text=await response.text();let data;try{data=JSON.parse(text)}catch{data=text}return {status:response.status,data};
}
async function rpc(token,name,body){return request('/rest/v1/rpc/'+name,{token,method:'POST',body});}
async function account(name){
 const email=`seeker-${name}-${suffix}@example.com`,password=randomUUID()+'Qa9!';
 const created=await request('/auth/v1/admin/users',{token:admin,method:'POST',body:{email,password,email_confirm:true,user_metadata:{display_name:name,role:'mentor'}}});
 assert.equal(created.status,200,JSON.stringify(created.data));users.push(created.data.id);
 const login=await request('/auth/v1/token?grant_type=password',{method:'POST',body:{email,password}});assert.equal(login.status,200);
 return {id:created.data.id,email,token:login.data.access_token};
}
function sql(query){return execFileSync('psql',['-X','-h','127.0.0.1','-p','54322','-U','postgres','-d','postgres','-v','ON_ERROR_STOP=1','-tAc',query],{env:{...process.env,PGPASSWORD:'postgres'},encoding:'utf8'}).trim();}

test('private workday, timesheet, review and unlock workflow',async()=>{
 const mentor=await account('mentor'),otherMentor=await account('other-mentor'),alice=await account('alice'),bob=await account('bob');
 sql(`update public.profiles set role='mentor' where id in ('${mentor.id}','${otherMentor.id}')`);
 try{
  let r=await request('/rest/v1/profiles',{token:alice.token});assert.equal(r.status,200);assert.equal(r.data.length,1);assert.equal(r.data[0].role,'student','user metadata must not promote a mentor');
  r=await request('/rest/v1/profiles?id=eq.'+alice.id,{token:alice.token,method:'PATCH',body:{role:'mentor'}});assert.ok(r.status>=400,'student cannot change role');
  r=await rpc(alice.token,'enroll_student',{p_email:bob.email});assert.ok(r.status>=400);
  r=await rpc(mentor.token,'enroll_student',{p_email:alice.email});assert.equal(r.status,200,JSON.stringify(r.data));
  r=await rpc(otherMentor.token,'enroll_student',{p_email:bob.email});assert.equal(r.status,200);
  r=await rpc(otherMentor.token,'enroll_student',{p_email:alice.email});assert.ok(r.status>=400,'cannot steal enrollment');
  r=await rpc(alice.token,'submit_lesson',{p_day:2,p_evidence:'https://example.com/work',p_reflection:'Attempt to skip'});assert.ok(r.status>=400,'future lesson blocked');
  r=await rpc(alice.token,'check_in',{p_yesterday:'',p_today:'Study Day 1',p_blockers:'',p_bedtime:'2026-01-01T22:00:00Z',p_wake_time:'2026-01-01T23:00:00Z'});assert.ok(r.status>=400,'stale routine rejected');
  r=await rpc(alice.token,'check_in',{p_yesterday:'Setup',p_today:'Study Day 1',p_blockers:'',p_bedtime:new Date(Date.now()-12*3600000).toISOString(),p_wake_time:new Date(Date.now()-4*3600000).toISOString(),p_routine_note:'Test routine'});assert.equal(r.status,200,JSON.stringify(r.data));const work=r.data;
  r=await rpc(alice.token,'check_in',{p_yesterday:'',p_today:'Duplicate',p_blockers:''});assert.ok(r.status>=400,'duplicate check-in blocked');
  // Set fixture attendance earlier; production check-in has no client timestamp parameter.
  sql(`update public.workdays set checked_in=date_trunc('milliseconds',now()-interval '3 hours'),work_date=((now()-interval '3 hours') at time zone 'Asia/Kolkata')::date where id='${work}'`);
  const start=new Date(Date.now()-2*3600000).toISOString(),end=new Date(Date.now()-3600000).toISOString();
  r=await rpc(alice.token,'save_time_entry',{p_workday:work,p_category:'practice',p_lesson:1,p_start:start,p_end:end,p_description:'Write test cases'});assert.equal(r.status,200,JSON.stringify(r.data));const entry=r.data;
  r=await rpc(alice.token,'save_time_entry',{p_workday:work,p_category:'break',p_lesson:null,p_start:start,p_end:end,p_description:'Overlapping break'});assert.ok(r.status>=400,'overlap blocked');
  r=await rpc(bob.token,'save_time_entry',{p_workday:work,p_category:'study',p_lesson:1,p_start:start,p_end:end,p_description:'Other student'});assert.ok(r.status>=400,'cross-student write blocked');
  r=await request('/rest/v1/routines',{token:bob.token});assert.equal(r.data.length,0,'routine entries are private');
  r=await request('/rest/v1/workdays',{token:bob.token});assert.equal(r.status,200);assert.equal(r.data.length,0,'cross-student read blocked');
  r=await request('/rest/v1/workdays',{token:otherMentor.token});assert.equal(r.data.length,0,'unassigned mentor read blocked');
  r=await request('/rest/v1/workdays',{token:mentor.token});assert.equal(r.data.length,1,'assigned mentor can read');
  r=await rpc(alice.token,'check_out',{p_workday:work,p_summary:'Finished test cases; need review'});assert.equal(r.status,204,JSON.stringify(r.data));
  r=await rpc(alice.token,'next_lesson',{p_student:alice.id});assert.equal(r.data,1,'checkout must not unlock');
  r=await rpc(alice.token,'correct_attendance',{p_workday:work,p_start:new Date(sql(`select checked_in from public.workdays where id='${work}'`)).toISOString(),p_end:new Date(Date.now()-1000).toISOString(),p_reason:'Correct a fixture check-in time'});assert.equal(r.status,204,JSON.stringify(r.data));
  r=await request('/rest/v1/audit_events?action=eq.attendance_corrected',{token:alice.token});assert.equal(r.data.length,1);assert.ok(r.data[0].before_value.checked_out!==r.data[0].after_value.checked_out);
  r=await rpc(alice.token,'save_time_entry',{p_workday:work,p_category:'revision',p_lesson:1,p_start:start,p_end:end,p_description:'Corrected category',p_entry:entry,p_reason:''});assert.ok(r.status>=400,'correction needs reason');
  r=await rpc(alice.token,'save_time_entry',{p_workday:work,p_category:'revision',p_lesson:1,p_start:start,p_end:end,p_description:'Corrected category',p_entry:entry,p_reason:'Originally picked wrong category'});assert.equal(r.status,200);
  r=await request('/rest/v1/audit_events?action=eq.timesheet_saved',{token:alice.token});assert.equal(r.data.length,2,'audit preserves initial and corrected entry');assert.ok(r.data.some(a=>a.before_value?.category==='practice'));
  r=await rpc(alice.token,'submit_lesson',{p_day:1,p_evidence:'javascript:alert(1)',p_reflection:'Bad link'});assert.ok(r.status>=400);
  r=await rpc(alice.token,'submit_lesson',{p_day:1,p_evidence:'https://example.com/private-work',p_reflection:'My answers'});assert.equal(r.status,200);let submission=r.data;
  r=await rpc(alice.token,'review_submission',{p_submission:submission,p_decision:'approved',p_feedback:'Self approval'});assert.ok(r.status>=400,'self approval blocked');
  r=await request('/rest/v1/submissions?id=eq.'+submission,{token:alice.token,method:'PATCH',body:{status:'approved'}});assert.ok(r.status>=400,'direct approval write blocked');
  r=await rpc(otherMentor.token,'review_submission',{p_submission:submission,p_decision:'approved',p_feedback:'Other mentor'});assert.ok(r.status>=400);
  r=await rpc(mentor.token,'review_submission',{p_submission:submission,p_decision:'revision',p_feedback:'Add expected results',p_score:55});assert.equal(r.status,204,JSON.stringify(r.data));
  r=await rpc(alice.token,'next_lesson',{p_student:alice.id});assert.equal(r.data,1,'revision stays on same day');
  r=await rpc(alice.token,'submit_lesson',{p_day:1,p_evidence:'https://example.com/revised-work',p_reflection:'Added expected results'});assert.equal(r.status,200);submission=r.data;
  r=await rpc(mentor.token,'review_submission',{p_submission:submission,p_decision:'approved',p_feedback:'Clear and reproducible',p_score:85});assert.equal(r.status,204);
  r=await rpc(alice.token,'next_lesson',{p_student:alice.id});assert.equal(r.data,2,'mentor approval unlocks next day');
  r=await rpc(mentor.token,'review_submission',{p_submission:submission,p_decision:'revision',p_feedback:'Overwrite attempt'});assert.ok(r.status>=400,'review is immutable');
  r=await request('/rest/v1/submissions?select=*,reviews(*)',{token:alice.token});assert.equal(r.data.length,2);assert.ok(r.data.every(s=>s.reviews && (Array.isArray(s.reviews)?s.reviews.length===1:typeof s.reviews.feedback==='string')),'attempts and feedback retained');
  r=await request('/rest/v1/workdays');assert.ok(r.status>=400,'anonymous records unavailable');
 }finally{
  // Remove only records owned by generated local test IDs, respecting immutable app permissions.
  const ids=users.map(id=>`'${id}'`).join(',');
  sql(`delete from public.audit_events where student_id in (${ids}); delete from public.reviews where mentor_id in (${ids}); delete from public.submissions where student_id in (${ids}); delete from public.time_entries where workday_id in (select id from public.workdays where student_id in (${ids})); delete from public.routines where workday_id in (select id from public.workdays where student_id in (${ids})); delete from public.workdays where student_id in (${ids}); delete from public.enrollments where student_id in (${ids});`);
  for(const id of users)await request('/auth/v1/admin/users/'+id,{token:admin,method:'DELETE'});
 }
});


test('mentor bootstrap requires administrator authorization and verified email',async()=>{
 const email=`mentor-bootstrap-${randomUUID()}@example.com`;
 sql(`insert into private.seeker_mentor_emails values ('${email}')`);
 let id;
 try{
  let result=await request('/auth/v1/admin/users',{token:admin,method:'POST',body:{email,password:randomUUID()+'Qa9!',email_confirm:false,user_metadata:{display_name:'Bootstrap mentor'}}});
  assert.equal(result.status,200);id=result.data.id;
  assert.equal(sql(`select role from public.profiles where id='${id}'`),'student','unverified allowlisted email cannot be mentor');
  result=await request('/auth/v1/admin/users/'+id,{token:admin,method:'PUT',body:{email_confirm:true}});assert.equal(result.status,200);
  assert.equal(sql(`select role from public.profiles where id='${id}'`),'mentor','verified authorized email becomes mentor');
 }finally{if(id)await request('/auth/v1/admin/users/'+id,{token:admin,method:'DELETE'});sql(`delete from private.seeker_mentor_emails where email='${email}'`);}
});
