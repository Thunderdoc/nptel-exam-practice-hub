# Changelog

All notable changes to the NPTEL Exam Practice Hub.

## 2026-10-23 — Proper project structure + UI redesign

- Repository restructured from a single HTML file into a maintained layout:
  `index.html` (markup), `assets/css/style.css`, `assets/js/app.js`,
  `data/questions.json`, `docs/`, plus `.gitignore`, `LICENSE` and this
  changelog.
- UI/UX redesign pass against the supplied light/dark reference screens:
  Inter typeface, layered card shadows, 18px radii, blurred sticky header
  and bottom bar, redrawn Welcome illustration, all emoji iconography
  replaced with SVG line icons, corrected mock palette legend
  (Red = marked for review).
- Fixed a duplicated, broken note-save handler in Revision.
- Vercel project connected to this repository — pushes to `main` now
  deploy automatically.

## 2026-10-23 — v2 (initial public release)

- Login-first device-local accounts (hashed passwords), mandatory subject
  selection (Geography & Environment).
- Practice: week Practice mode + submit-all Week Test, All Questions,
  Random, Custom Practice Generator, timed Mock with palette.
- Learn From Zero: 12 bank-derived lessons with real-question mini-quizzes.
- Revision: Wrong Answers, Bookmarks, Quick Revision flashcards, Notes.
- Search, Exam Countdown, Exam Readiness Score, Report-a-Wrong-Answer,
  local Admin preview, Source & Limits page.
- Question bank: 113 questions verified two ways in the source plus sample
  cross-checks — 0 mismatches (see `docs/VERIFICATION.md`).
