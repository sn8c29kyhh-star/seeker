# Publishing and maintaining the Seeker portal

The portal uses Docsify to read the Markdown curriculum. GitHub Pages serves the public course; it does not store student accounts or assessment results.

## Production deployment

In repository **Settings → Pages**, select **GitHub Actions** as the source. The existing `.github/workflows/pages.yml` validates navigation and progress logic, copies `curriculum/`, `guides/`, and `instructor/` into the published artifact, then deploys `docs/`.

Changes pushed to `main` under those directories, `docs/`, `scripts/`, `tests/`, the root README, or the Pages workflow trigger deployment. You can also run **Deploy GitHub Pages** manually from Actions.

Use the Actions deployment method. The `docs/curriculum`, `docs/guides`, and `docs/instructor` links are conveniences for local development; the workflow replaces them with real directories in the deployment artifact. Publishing `docs/` directly from a branch skips that packaging step.

## Local preview

From the repository root:

```bash
python3 -m http.server 4317 --bind 127.0.0.1 --directory docs
```

Open [the local portal](http://127.0.0.1:4317/). On systems without working symlinks, prepare a disposable copy first:

```bash
mkdir -p .cache/preview
cp -RL docs/. .cache/preview/
python3 -m http.server 4317 --bind 127.0.0.1 --directory .cache/preview
```

Use a separate browser profile when testing progress so you do not overwrite a learner’s own study marks. Localhost and the published site have separate browser storage.

## Editing the interface

- `docs/README.md`: learning-path home page.
- `docs/_sidebar.md`: navigation. Keep links root-relative, beginning with `/`, so they work from nested lessons.
- `docs/portal.css`: reading layout, colours, themes, mobile navigation, and print styles.
- `docs/portal.js`: reading controls, lesson navigation, diagram rendering, and study reminders.
- `docs/progress-store.js`: versioned browser progress validation and persistence.
- `docs/index.html`: portal shell and pinned CDN dependencies.

Keep lesson content in `curriculum/`; do not edit generated copies in the deployment artifact. The course can be read without installing developer tools.

## Study reminders and limitations

Students can mark each main day lesson studied and undo the mark. The home page resumes the first unmarked day. The total starts at zero and measures self-reported study, not assessed mastery. Exercises and resource pages do not independently complete a day.

Progress is stored under `seeker-study-v1` in localStorage. It belongs to this site’s origin and this browser profile, is shared by anyone using that profile, and can disappear when browser data is cleared. There is no login, device sync, submission upload, quiz engine, or mentor grade book. Storage failures are shown to the student; in that case changes last for the current page session only. Other tabs receive saved progress changes.

The old phase selection is deliberately not converted into completed days: opening a phase did not prove that any lesson was studied. All lessons remain readable. No public JavaScript or localStorage value should be trusted to award a grade or enforce assessment prerequisites.

Docsify, search, and Mermaid load from pinned jsDelivr URLs. Reading requires JavaScript and access to the Docsify CDN. Mermaid loads only on pages containing diagrams. If it cannot load or parse a diagram, the source remains available as text. System fonts avoid a separate font download. No new analytics or third-party tracking has been added by this redesign.

## Validation

Node.js 18+ and Python 3 are sufficient; no package installation is needed:

```bash
node --check docs/portal.js
node --check docs/progress-store.js
node --test tests/progress-store.test.cjs
python3 scripts/check-site.py
git diff --check
```

These checks cover progress data validation, save/reload/undo, storage failure, course routes, sidebar destinations, and local assets. They do not prove browser rendering, responsive layout, external exercise availability, or the complete student/mentor workflow. Before a cohort launch, exercise the site at desktop and phone widths with keyboard navigation, both themes, larger text, reloads, and a private test student account for submissions.
