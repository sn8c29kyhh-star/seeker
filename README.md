# Seeker · Manual QA learning path

A 30-day course for students preparing for Manual QA, QA Analyst, and Functional Testing roles. No application programming is required; basic SQL and API testing are included. The course builds practical skills and a portfolio, rather than guaranteeing employment after a fixed number of days.

[Open the learning portal](https://sn8c29kyhh-star.github.io/seeker/) · [Full curriculum](curriculum/overview.md) · [Student onboarding](guides/candidate-onboarding-instructions.md)

## Course structure

| Phase | Days | Practice |
| --- | --- | --- |
| Testing foundations | 1–7 | Test design, test cases, requirement coverage |
| Defects and Jira | 8–14 | Bug reports, triage, Agile sprint simulation |
| SQL data validation | 15–20 | Queries, joins, and checking records |
| API testing | 21–25 | Postman requests, collections, response checks |
| Portfolio and job preparation | 26–30 | Testing project, resume, interview practice |

Start with [Day 0 setup](curriculum/setup/README.md), then [Day 1](curriculum/days/phase-1/day-01/README.md). Each day is a learning unit; students can take longer when they need more practice.

## Candidate and mentor workspace

[Open My workspace](https://sn8c29kyhh-star.github.io/seeker/workspace.html) for authenticated student and mentor accounts backed by Supabase.

Candidates can check in/out, record a standup, optionally enter bedtime/wake-up times, log actual activities and breaks, submit lesson evidence, and read mentor feedback. Mentors enroll candidates, review attendance/timesheets, see weekly summaries, and approve assignments or request revisions. A server-side approval unlocks the next submission; attendance and self-reported routine do not award a pass.

Students see their own private records. Mentors see only assigned candidates. Corrections retain before/after history, and submission retries retain earlier feedback. Lesson content stays public as reference material. The curriculum's browser-saved reading reminders remain separate from approved assignment progress.

**Before inviting candidates:** configure a production email sender in Supabase, authorize and verify the mentor account, then enroll confirmed student accounts. Supabase's default email sender is limited to project-team addresses. The project administrator must not disable confirmation or invite candidates into the Supabase organization as a workaround.

See the [workspace setup and operations guide](guides/workspace-operations.md) for onboarding, data/access rules, correction behavior, local tests, deployment, and limitations. The first version accepts private evidence links; automatic quizzes, weekly examinations, file uploads, leave management, and configurable pass thresholds are later extensions.

## Curriculum development

Pilot Days 1–7 with a small group before expanding all 30 days. Use the revised [lesson template](curriculum/days/template/day-template.md) for objectives, explanations, videos with text alternatives, worked examples, exercises, submissions, and review criteria. Later phases still need repeatable practice datasets and exercises checked against their target applications.

## Development and publishing

See the [Pages maintenance guide](guides/github-pages-guide.md) for local preview, production deployment, validation commands, CDN dependencies, and storage limitations. The reading portal remains Docsify on GitHub Pages; the workspace uses Supabase Auth and PostgreSQL.
