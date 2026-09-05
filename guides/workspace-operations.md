# Seeker workspace: setup and operation

The curriculum stays on GitHub Pages. `workspace.html` is the private student/mentor interface on the same site, backed by Supabase Auth and PostgreSQL. Course files remain public; assignment submission and approved progression are enforced in the database.

## First mentor and candidate accounts

1. Configure authentication email delivery in Supabase **Authentication → Email → SMTP settings**. The default sender only sends to project-team addresses and is unsuitable for general candidate signup. Keep email confirmation enabled. See [Supabase SMTP guidance](https://supabase.com/docs/guides/auth/auth-smtp).
2. The project administrator authorizes a mentor email with `python3 scripts/authorize-mentor.py mentor@example.com`. This uses the already authenticated Supabase CLI and writes to a private allowlist, not the public site.
3. The mentor opens `workspace.html`, creates an account using that email, and follows the confirmation link. The database grants the mentor role only after that email is verified. Existing verified accounts are promoted by the authorization script. Supabase dashboard/CLI accounts and Seeker accounts are separate.
4. Each candidate creates and confirms their own account. The mentor opens **Enroll a candidate**, enters that confirmed email, and sets a timezone and daytime schedule. Enrollment starts at Day 1. An existing enrollment cannot be silently reassigned to another mentor.
5. The candidate signs in or presses **Check enrollment**. They can then check in, record work, and submit their first assignment.

New signups have no enrollment or access to other students. Candidates must not be invited as members of the Supabase project team merely to work around email delivery restrictions.

## Daily operation

- **Check-in:** the server records the time and the date in the enrolled timezone. Standup includes previous work, today's plan, and blockers. Only one open workday is allowed, and one workday per local date.
- **Personal routine:** bedtime and wake-up timestamps are optional and self-reported. They must both be entered, with wake-up after bedtime and in the past 48 hours. The reported window is limited to 24 hours. These entries are visible only to the student and assigned mentor; they never approve a lesson or generate a discipline score.
- **Timesheet:** log study, practice, meetings, revision, and breaks. Entries must fit within attendance and cannot overlap. An optional lesson reference cannot point beyond the current available assignment. Dates/times in forms use the device timezone, identified on the page; enrollment dates use the enrolled timezone.
- **Check-out:** a daily summary is required. Attendance time and logged work time are separate; breaks do not count as logged work. Checking out does not submit or approve a lesson.
- **Corrections:** a reason is required for timesheet edits, late additions after checkout, and attendance corrections. Before/after values are retained in the audit history. Attendance over 24 hours requires correction with the actual finish time. Correct time entries first if they would fall outside corrected attendance.
- **Submission:** the candidate supplies an HTTPS evidence link and their answers/reflection. Share the linked document privately with the mentor's account. File storage/attachment upload is not provided by this first version.
- **Review:** the assigned mentor records feedback and either approves or requests changes. Optional scores are out of 100. Requesting changes permits another attempt at the same day; approving unlocks the next submission. Attempts and reviews are retained. There are no automatic quizzes or passing thresholds in this release.

The mentor sees attendance, standups, activities, submissions, correction history, and a last-seven-days summary. Check-ins after the agreed start are contextual observations, not automatic absence or misconduct findings. Leave, holidays, schedule exceptions, and disciplinary scoring are not implemented.

Student history shows the last 90 workdays, 300 submission attempts, and 100 audit events. Mentor records include all accessible submissions, workdays from the past 90 days, and the last 150 audit events. Older records stay in the database. Enrollment changes, deactivation, mentor revocation, exports, and retention/deletion requests currently require the project administrator; no destructive student controls are exposed.

## Data and access design

| Table | Purpose |
| --- | --- |
| `profiles` | Student/mentor role and display name; clients cannot change roles |
| `enrollments` | Assigned mentor, timezone, work schedule, active flag |
| `workdays` | Attendance and daily standup/summary |
| `routines` | Optional bedtime/wake-up details |
| `time_entries` | Actual activities and breaks |
| `submissions` | Versioned lesson attempts and evidence links |
| `reviews` | Immutable mentor decisions, feedback, optional score |
| `audit_events` | Correction and review history |
| `private.seeker_mentor_emails` | Administrator-controlled mentor authorization, outside the Data API |

All public application tables have Row Level Security. Authenticated clients receive SELECT privileges only, filtered to their own or assigned student records. Mutations use narrowly scoped database RPCs with fixed search paths, server-side identity checks, validation, and locks. Anonymous users cannot read the records. Only server-controlled verified emails can bootstrap mentors; user-editable metadata is never trusted for roles.

`docs/supabase-config.js` contains only the project URL and publishable key. This key is intentionally public and relies on authenticated database policies. Secret/service-role keys, SMTP passwords, and database passwords must never enter `docs/`, Git history, or GitHub Pages artifacts.

## Local development and verification

Requirements: Supabase CLI 2.116.0, Docker, Node.js 20+, and `psql` on PATH. The first start downloads containers. Run from the repository root:

```bash
supabase start -x realtime,storage-api,imgproxy,studio,edge-runtime,logflare,vector,supavisor,postgres-meta
supabase db lint --local --level error
node --test tests/progress-store.test.cjs tests/workspace.integration.test.mjs
python3 scripts/check-site.py
node --check docs/workspace.js
```

The integration suite refuses hosted URLs. It creates isolated local users and exercises actual Auth, PostgREST, RLS, and RPC calls: forged mentor metadata, enrollment, private reads, duplicate check-in, overlapping entries, corrections/audit, invalid evidence URLs, unauthorized approval, revision/resubmission, and next-day unlocking. It also tests verified-email mentor bootstrapping. Test-owned records are removed afterward.

Use `supabase status -o json` to obtain local public settings for an uncommitted local preview of `docs/supabase-config.js`. Never copy the secret/service-role key. Restore the hosted public settings before publication. Start `python3 -m http.server 4317 --bind 127.0.0.1 --directory docs`, then open `/workspace.html`. Local Supabase emails go to Mailpit on port 54324. Stop only this project's stack with `supabase stop` when finished; do not reset hosted data.

The local integration tests prove backend behavior, not visual browser behavior. Browser QA should cover email confirmation/recovery redirects, sign-in/out across tabs, phone layout, form errors, timezones, and student-to-mentor review interaction before enrolling a cohort.

## Deployment and maintenance

Schema changes live in `supabase/migrations/`. Never edit an already deployed migration; add another migration. Review and apply only to the linked Seeker project:

```bash
supabase projects list
supabase migration list
supabase db push --dry-run
supabase db push
```

Auth site URL: `https://sn8c29kyhh-star.github.io/seeker/workspace.html`. Allow that exact callback and the explicit local preview callback. Email confirmations are enabled, the password minimum is 10 characters, and anonymous sign-in is disabled. Review `supabase config push` carefully: it applies local configuration to hosted services. Before changing it after SMTP setup, preserve hosted sender/provider settings and use environment references for secrets.

Run the local integration tests before pushing application changes. `.github/workflows/workspace-tests.yml` repeats them in an isolated CI backend, and Pages checks source syntax and navigation before publication. Database migrations are applied separately; the Pages workflow never holds a privileged Supabase credential or deploys migrations automatically.

If an application deployment fails, keep the last successful Pages version. Do not use `supabase db reset --linked` as rollback. Treat database changes as forward migrations, retain records, and test compatibility before restoring earlier application code.
