-- Google supplies full_name/name rather than the email form's display_name.
-- Metadata is for presentation only; mentor roles still require verified allowlisted emails.
create or replace function public.on_seeker_signup() returns trigger
language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(id,display_name,role) values(
  new.id,
  left(coalesce(nullif(new.raw_user_meta_data->>'display_name',''),nullif(new.raw_user_meta_data->>'full_name',''),new.raw_user_meta_data->>'name',''),120),
  case when new.email_confirmed_at is not null and exists(select 1 from private.seeker_mentor_emails where email=lower(new.email)) then 'mentor' else 'student' end
 );
 return new;
end $$;
revoke execute on function public.on_seeker_signup() from public,anon,authenticated;

-- Preserve every existing non-empty display name.
update public.profiles p
set display_name=left(coalesce(nullif(u.raw_user_meta_data->>'full_name',''),u.raw_user_meta_data->>'name',''),120)
from auth.users u where p.id=u.id and p.display_name='';
