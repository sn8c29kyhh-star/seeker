"""Authorize an explicit mentor email on the linked Seeker project; never store it in Git."""
import re
import subprocess
import sys
from pathlib import Path
if len(sys.argv) != 2 or not re.fullmatch(r"[A-Za-z0-9.!#$%&*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", sys.argv[1]):
    raise SystemExit('Usage: python3 scripts/authorize-mentor.py mentor@example.com')
email = sys.argv[1].strip().lower()
root = Path(__file__).resolve().parent.parent
linked = root / 'supabase/.temp/project-ref'
if not linked.exists() or linked.read_text().strip() != 'pljlrpxcerlvrqlnyisw':
    raise SystemExit('Link the Seeker project (pljlrpxcerlvrqlnyisw) before authorizing a mentor.')
# The validation excludes SQL quote characters; use subprocess argv, never a shell command.
query = f"""insert into private.seeker_mentor_emails(email) values ('{email}') on conflict do nothing;
update public.profiles p set role='mentor' from auth.users u where p.id=u.id and lower(u.email)='{email}' and u.email_confirmed_at is not null;"""
subprocess.run(['supabase','db','query','--linked',query], cwd=root, check=True)
print('Mentor email authorized. Account email verification is still required.')
