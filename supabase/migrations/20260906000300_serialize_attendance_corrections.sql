-- Serialize corrections for one candidate, including concurrent changes to different dates.
create or replace function public.correct_attendance(p_workday uuid,p_start timestamptz,p_end timestamptz,p_reason text) returns void language plpgsql security definer set search_path='' as $$
declare work public.workdays; zone text;
begin
 perform 1 from public.enrollments where student_id=auth.uid() and active for update;
 if not found then raise exception 'Active enrollment required'; end if;
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

