-- Seeker: private trainee records. Browser clients have SELECT only; all writes
-- go through authenticated, validated RPCs with a fixed search_path.
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default '' check (length(display_name)<=120),
 role text not null default 'student' check (role in ('student','mentor')),
 created_at timestamptz not null default now()
);
create table public.enrollments (
 student_id uuid primary key references public.profiles(id),
 mentor_id uuid not null references public.profiles(id),
 timezone text not null default 'Asia/Kolkata',
 starts_at time not null default '09:00', ends_at time not null default '18:00',
 active boolean not null default true, created_at timestamptz not null default now(),
 check(student_id<>mentor_id), check(starts_at<ends_at)
);
create table public.workdays (
 id uuid primary key default gen_random_uuid(), student_id uuid not null references public.profiles(id),
 work_date date not null, checked_in timestamptz not null default now(), checked_out timestamptz,
 yesterday text not null default '' check(length(yesterday)<=3000),
 today text not null check(length(trim(today)) between 1 and 3000),
 blockers text not null default '' check(length(blockers)<=3000),
 summary text not null default '' check(length(summary)<=5000),
 unique(student_id,work_date), check(checked_out is null or checked_out>checked_in)
);
create unique index workdays_one_open on public.workdays(student_id) where checked_out is null;
create table public.routines (
 workday_id uuid primary key references public.workdays(id),
 bedtime timestamptz not null, wake_time timestamptz not null,
 note text not null default '' check(length(note)<=2000),
 check(wake_time>bedtime and wake_time-bedtime<=interval '24 hours')
);
create table public.time_entries (
 id uuid primary key default gen_random_uuid(), workday_id uuid not null references public.workdays(id),
 category text not null check(category in ('study','practice','meeting','revision','break')),
 lesson_day integer check(lesson_day between 1 and 30),
 starts_at timestamptz not null, ends_at timestamptz not null,
 description text not null check(length(trim(description)) between 1 and 3000),
 created_at timestamptz not null default now(),
 check(ends_at>starts_at and ends_at-starts_at<=interval '24 hours')
);
create index time_entries_workday on public.time_entries(workday_id);
create table public.submissions (
 id uuid primary key default gen_random_uuid(), student_id uuid not null references public.profiles(id),
 lesson_day integer not null check(lesson_day between 1 and 30),
 attempt integer not null check(attempt>0),
 evidence_url text not null check(evidence_url ~ '^https://[^[:space:]]+$' and length(evidence_url)<=2000),
 reflection text not null check(length(trim(reflection)) between 1 and 10000),
 status text not null default 'submitted' check(status in ('submitted','approved','revision')),
 submitted_at timestamptz not null default now(), unique(student_id,lesson_day,attempt)
);
create unique index submissions_one_pending on public.submissions(student_id,lesson_day) where status='submitted';
create unique index submissions_one_approval on public.submissions(student_id,lesson_day) where status='approved';
create table public.reviews (
 id uuid primary key default gen_random_uuid(), submission_id uuid not null unique references public.submissions(id),
 mentor_id uuid not null references public.profiles(id), decision text not null check(decision in ('approved','revision')),
 score integer check(score between 0 and 100), feedback text not null check(length(trim(feedback)) between 1 and 10000),
 reviewed_at timestamptz not null default now()
);
create table public.audit_events (
 id bigint generated always as identity primary key, student_id uuid not null references public.profiles(id),
 actor_id uuid not null references public.profiles(id), action text not null,
 record_id uuid not null, reason text not null, before_value jsonb, after_value jsonb,
 created_at timestamptz not null default now()
);
create index audit_student on public.audit_events(student_id,created_at desc);

create function public.on_seeker_signup() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(id,display_name) values(new.id,left(coalesce(new.raw_user_meta_data->>'display_name',''),120));
 return new;
end $$;
create trigger seeker_signup after insert on auth.users for each row execute function public.on_seeker_signup();
insert into public.profiles(id,display_name) select id,left(coalesce(raw_user_meta_data->>'display_name',''),120) from auth.users on conflict do nothing;

create function public.is_mentor() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.profiles where id=auth.uid() and role='mentor')
$$;
create function public.can_read_student(p_student uuid) returns boolean language sql stable security definer set search_path='' as $$
 select auth.uid()=p_student or (public.is_mentor() and exists(select 1 from public.enrollments where student_id=p_student and mentor_id=auth.uid()))
$$;
create function public.next_lesson(p_student uuid) returns integer language plpgsql stable security definer set search_path='' as $$
begin
 if not public.can_read_student(p_student) then raise exception 'Access denied'; end if;
 return (select min(d) from generate_series(1,30) d where not exists(select 1 from public.submissions s where s.student_id=p_student and s.lesson_day=d and s.status='approved'));
end $$;

alter table public.profiles enable row level security;
alter table public.enrollments enable row level security;
alter table public.workdays enable row level security;
alter table public.routines enable row level security;
alter table public.time_entries enable row level security;
alter table public.submissions enable row level security;
alter table public.reviews enable row level security;
alter table public.audit_events enable row level security;
create policy profiles_read on public.profiles for select to authenticated using(public.can_read_student(id) or exists(select 1 from public.enrollments e where e.student_id=auth.uid() and e.mentor_id=profiles.id));
create policy enrollments_read on public.enrollments for select to authenticated using(public.can_read_student(student_id));
create policy workdays_read on public.workdays for select to authenticated using(public.can_read_student(student_id));
create policy routines_read on public.routines for select to authenticated using(exists(select 1 from public.workdays w where w.id=workday_id and public.can_read_student(w.student_id)));
create policy time_entries_read on public.time_entries for select to authenticated using(exists(select 1 from public.workdays w where w.id=workday_id and public.can_read_student(w.student_id)));
create policy submissions_read on public.submissions for select to authenticated using(public.can_read_student(student_id));
create policy reviews_read on public.reviews for select to authenticated using(exists(select 1 from public.submissions s where s.id=submission_id and public.can_read_student(s.student_id)));
create policy audit_read on public.audit_events for select to authenticated using(public.can_read_student(student_id));

create function public.enroll_student(p_email text,p_timezone text default 'Asia/Kolkata',p_start time default '09:00',p_end time default '18:00') returns uuid language plpgsql security definer set search_path='' as $$
declare target uuid; existing public.enrollments;
begin
 if not public.is_mentor() then raise exception 'Mentor access required'; end if;
 if not exists(select 1 from pg_timezone_names where name=p_timezone) then raise exception 'Unknown timezone'; end if;
 if p_start is null or p_end is null or p_start>=p_end then raise exception 'Start must be before end'; end if;
 select u.id into target from auth.users u join public.profiles p on p.id=u.id where lower(u.email)=lower(trim(p_email)) and u.email_confirmed_at is not null and p.role='student';
 if target is null then raise exception 'No confirmed student account found for that email'; end if;
 perform 1 from public.profiles where id=target for update;
 select * into existing from public.enrollments where student_id=target;
 if found then raise exception 'This student is already enrolled; contact the administrator to change enrollment'; end if;
 insert into public.enrollments(student_id,mentor_id,timezone,starts_at,ends_at) values(target,auth.uid(),p_timezone,p_start,p_end);
 insert into public.audit_events(student_id,actor_id,action,record_id,reason) values(target,auth.uid(),'enrolled',target,'Mentor enrolled student');
 return target;
end $$;

create function public.check_in(p_yesterday text,p_today text,p_blockers text,p_bedtime timestamptz default null,p_wake_time timestamptz default null,p_routine_note text default '') returns uuid language plpgsql security definer set search_path='' as $$
declare enrollment public.enrollments; result uuid; checkin_time timestamptz:=date_trunc('milliseconds',clock_timestamp());
begin
 select * into enrollment from public.enrollments where student_id=auth.uid() and active for update;
 if not found then raise exception 'Active enrollment required'; end if;
 if exists(select 1 from public.workdays where student_id=auth.uid() and checked_out is null) then raise exception 'You already have an open workday. Check out or correct it first.'; end if;
 if (p_bedtime is null)<>(p_wake_time is null) then raise exception 'Provide both bedtime and wake time, or leave both blank'; end if;
 if p_wake_time>checkin_time or p_wake_time<checkin_time-interval '48 hours' then raise exception 'Wake time must be within the past 48 hours'; end if;
 insert into public.workdays(student_id,work_date,checked_in,yesterday,today,blockers) values(auth.uid(),(checkin_time at time zone enrollment.timezone)::date,checkin_time,coalesce(p_yesterday,''),p_today,coalesce(p_blockers,'')) returning id into result;
 if p_bedtime is not null then insert into public.routines values(result,p_bedtime,p_wake_time,coalesce(p_routine_note,'')); end if;
 return result;
end $$;

create function public.save_time_entry(p_workday uuid,p_category text,p_lesson integer,p_start timestamptz,p_end timestamptz,p_description text,p_entry uuid default null,p_reason text default '') returns uuid language plpgsql security definer set search_path='' as $$
declare work public.workdays; old_entry public.time_entries; result uuid;
begin
 select * into work from public.workdays where id=p_workday and student_id=auth.uid() for update;
 if not found then raise exception 'Workday not found'; end if;
 if not exists(select 1 from public.enrollments where student_id=auth.uid() and active) then raise exception 'Active enrollment required'; end if;
 if p_start is null or p_end is null or p_end<=p_start or p_end-p_start>interval '24 hours' or p_start<work.checked_in or p_end>coalesce(work.checked_out,clock_timestamp()) then raise exception 'Entry must fit inside your recorded attendance, with an end after its start'; end if;
 if p_lesson is not null and p_lesson>coalesce(public.next_lesson(auth.uid()),30) then raise exception 'That assignment is not available yet'; end if;
 if exists(select 1 from public.time_entries where workday_id=p_workday and (p_entry is null or id<>p_entry) and starts_at<p_end and ends_at>p_start) then raise exception 'This entry overlaps another activity or break'; end if;
 if (p_entry is not null or work.checked_out is not null) and length(trim(coalesce(p_reason,'')))<5 then raise exception 'Provide a correction reason (at least 5 characters)'; end if;
 if p_entry is not null then
  select * into old_entry from public.time_entries where id=p_entry and workday_id=p_workday;
  if not found then raise exception 'Entry not found'; end if;
  update public.time_entries set category=p_category,lesson_day=p_lesson,starts_at=p_start,ends_at=p_end,description=p_description where id=p_entry returning id into result;
 else
  insert into public.time_entries(workday_id,category,lesson_day,starts_at,ends_at,description) values(p_workday,p_category,p_lesson,p_start,p_end,p_description) returning id into result;
 end if;
 insert into public.audit_events(student_id,actor_id,action,record_id,reason,before_value,after_value) values(auth.uid(),auth.uid(),'timesheet_saved',result,coalesce(nullif(trim(p_reason),''),'Initial entry'),case when p_entry is not null then to_jsonb(old_entry) end,(select to_jsonb(t) from public.time_entries t where id=result));
 return result;
end $$;

create function public.check_out(p_workday uuid,p_summary text) returns void language plpgsql security definer set search_path='' as $$
declare work public.workdays;
begin
 select * into work from public.workdays where id=p_workday and student_id=auth.uid() for update;
 if not found or work.checked_out is not null then raise exception 'Open workday not found'; end if;
 if length(trim(coalesce(p_summary,'')))<1 then raise exception 'Add your daily summary'; end if;
 if clock_timestamp()-work.checked_in>interval '24 hours' then raise exception 'This check-in is over 24 hours old. Use attendance correction with the actual finish time.'; end if;
 update public.workdays set checked_out=clock_timestamp(),summary=p_summary where id=p_workday;
end $$;

create function public.correct_attendance(p_workday uuid,p_start timestamptz,p_end timestamptz,p_reason text) returns void language plpgsql security definer set search_path='' as $$
declare work public.workdays; zone text;
begin
 select * into work from public.workdays where id=p_workday and student_id=auth.uid() for update;
 if not found then raise exception 'Workday not found'; end if;
 select timezone into zone from public.enrollments where student_id=auth.uid() and active;
 if zone is null then raise exception 'Active enrollment required'; end if;
 if length(trim(coalesce(p_reason,'')))<5 then raise exception 'Provide a correction reason (at least 5 characters)'; end if;
 if p_start is null or p_end is null or p_end<=p_start or p_end>clock_timestamp() or p_end-p_start>interval '24 hours' or (p_start at time zone zone)::date<>work.work_date then raise exception 'Use actual past times within 24 hours, starting on the original work date'; end if;
 if exists(select 1 from public.time_entries where workday_id=p_workday and (starts_at<p_start or ends_at>p_end)) then raise exception 'Correct timesheet entries first so they fit inside attendance'; end if;
 if exists(select 1 from public.workdays where student_id=auth.uid() and id<>p_workday and checked_in<p_end and coalesce(checked_out,clock_timestamp())>p_start) then raise exception 'Attendance overlaps another workday'; end if;
 update public.workdays set checked_in=p_start,checked_out=p_end where id=p_workday;
 insert into public.audit_events(student_id,actor_id,action,record_id,reason,before_value,after_value) values(auth.uid(),auth.uid(),'attendance_corrected',p_workday,p_reason,to_jsonb(work),(select to_jsonb(w) from public.workdays w where id=p_workday));
end $$;

create function public.submit_lesson(p_day integer,p_evidence text,p_reflection text) returns uuid language plpgsql security definer set search_path='' as $$
declare result uuid; attempt_number integer;
begin
 perform 1 from public.enrollments where student_id=auth.uid() and active for update;
 if not found then raise exception 'Active enrollment required'; end if;
 if p_day is distinct from public.next_lesson(auth.uid()) then raise exception 'Only your current available lesson can be submitted'; end if;
 if exists(select 1 from public.submissions where student_id=auth.uid() and lesson_day=p_day and status='submitted') then raise exception 'Your submission is already awaiting review'; end if;
 select coalesce(max(attempt),0)+1 into attempt_number from public.submissions where student_id=auth.uid() and lesson_day=p_day;
 insert into public.submissions(student_id,lesson_day,attempt,evidence_url,reflection) values(auth.uid(),p_day,attempt_number,p_evidence,p_reflection) returning id into result;
 return result;
end $$;

create function public.review_submission(p_submission uuid,p_decision text,p_feedback text,p_score integer default null) returns void language plpgsql security definer set search_path='' as $$
declare item public.submissions;
begin
 if not public.is_mentor() then raise exception 'Mentor access required'; end if;
 select * into item from public.submissions where id=p_submission for update;
 if not found or not exists(select 1 from public.enrollments where student_id=item.student_id and mentor_id=auth.uid() and active) then raise exception 'Submission not found or not assigned to you'; end if;
 if item.status<>'submitted' then raise exception 'This attempt has already been reviewed'; end if;
 if p_decision not in ('approved','revision') or p_decision is null then raise exception 'Choose approve or request changes'; end if;
 insert into public.reviews(submission_id,mentor_id,decision,score,feedback) values(p_submission,auth.uid(),p_decision,p_score,p_feedback);
 update public.submissions set status=p_decision where id=p_submission;
 insert into public.audit_events(student_id,actor_id,action,record_id,reason,before_value,after_value) values(item.student_id,auth.uid(),'submission_reviewed',item.id,p_feedback,to_jsonb(item),jsonb_build_object('decision',p_decision,'score',p_score));
end $$;

-- Default Supabase grants vary. Explicitly close both direct writes and function execution.
revoke all on public.profiles,public.enrollments,public.workdays,public.routines,public.time_entries,public.submissions,public.reviews,public.audit_events from anon,authenticated;
grant select on public.profiles,public.enrollments,public.workdays,public.routines,public.time_entries,public.submissions,public.reviews,public.audit_events to authenticated;
revoke all on sequence public.audit_events_id_seq from anon,authenticated;
revoke execute on function public.on_seeker_signup(),public.is_mentor(),public.can_read_student(uuid),public.next_lesson(uuid),public.enroll_student(text,text,time,time),public.check_in(text,text,text,timestamptz,timestamptz,text),public.save_time_entry(uuid,text,integer,timestamptz,timestamptz,text,uuid,text),public.check_out(uuid,text),public.correct_attendance(uuid,timestamptz,timestamptz,text),public.submit_lesson(integer,text,text),public.review_submission(uuid,text,text,integer) from public,anon,authenticated;
grant execute on function public.is_mentor(),public.can_read_student(uuid),public.next_lesson(uuid),public.enroll_student(text,text,time,time),public.check_in(text,text,text,timestamptz,timestamptz,text),public.save_time_entry(uuid,text,integer,timestamptz,timestamptz,text,uuid,text),public.check_out(uuid,text),public.correct_attendance(uuid,timestamptz,timestamptz,text),public.submit_lesson(integer,text,text),public.review_submission(uuid,text,text,integer) to authenticated;
