-- Only the project administrator can authorize mentor email addresses.
-- Promotion happens after Supabase has verified that email, never from user metadata.
create schema if not exists private;
revoke all on schema private from public,anon,authenticated;
create table private.seeker_mentor_emails(email text primary key check(email=lower(trim(email))));
alter table private.seeker_mentor_emails enable row level security;
revoke all on private.seeker_mentor_emails from public,anon,authenticated;
create or replace function public.on_seeker_signup() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(id,display_name,role) values(new.id,left(coalesce(new.raw_user_meta_data->>'display_name',''),120),case when new.email_confirmed_at is not null and exists(select 1 from private.seeker_mentor_emails where email=lower(new.email)) then 'mentor' else 'student' end);
 return new;
end $$;
create function public.on_seeker_email_verified() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if new.email_confirmed_at is not null and exists(select 1 from private.seeker_mentor_emails where email=lower(new.email)) then
  update public.profiles set role='mentor' where id=new.id;
 end if;
 return new;
end $$;
create trigger seeker_email_verified after update of email_confirmed_at,email on auth.users for each row execute function public.on_seeker_email_verified();
revoke execute on function public.on_seeker_signup(),public.on_seeker_email_verified() from public,anon,authenticated;
