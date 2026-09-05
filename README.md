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

## Reading and study progress

The GitHub Pages portal includes responsive navigation, light/dark appearance, a larger-text option, lesson contents, rendered diagrams, previous/next lessons, and a personal daily study checklist with undo.

**Study marks are saved only in the current browser.** They are not tied to a student account, do not synchronize across devices, and do not count as mentor approval. All lessons remain open for reference. The old phase-unlock selector has been replaced because it did not verify completion.

## Student submissions and review

Keep the curriculum public and each student’s work and scores in a separate private submission repository or private learning system. A filtered GitHub Project view is not an access boundary.

The mentor provides a private submission location and a daily issue template. The student submits evidence and moves the work to `In Review`; the mentor records feedback and approval before it becomes `Done`. Do not use a path on the student’s laptop as the only submission evidence.

See the [instructor guide](instructor/README.md) and [weekly evaluation rubric](instructor/templates/weekly-evaluation-rubric.md). Avoid giving students write access to the public curriculum solely to track their work.

## Extending this into assessed learning

Keep the Markdown course content, and add a student application/API when individual accounts and graded progression are introduced. The minimum records are enrollment, lesson version, submission, assessment attempt, score, feedback, and mentor approval. Store them under authenticated student identities and enforce access on the server.

Define the passing rule before implementation: daily quiz threshold, required practical approval, which days have weekly gates, and what happens after a failed attempt. For example, a 70% quiz threshold plus practical approval is a proposal to pilot, not a configured or validated rule. Preserve retry history and offer corrective exercises.

Keep grading keys private. A public repository can remain a reading library, but cannot conceal future lesson material. If future lessons themselves must be inaccessible, serve that content through authenticated access as well.

Before expanding all 30 days, pilot Days 1–7 with a small group. Use the revised [lesson template](curriculum/days/template/day-template.md) for objectives, key explanations, videos with text alternatives, worked examples, exercises, submissions, and assessment criteria. Later phases still need repeatable practice data and exercises checked against the actual target applications.

## Development and publishing

See the [Pages maintenance guide](guides/github-pages-guide.md) for local preview, production deployment, validation commands, CDN dependencies, and storage limitations. The project remains a static Docsify site deployed through GitHub Actions; no backend or account infrastructure is provisioned.
