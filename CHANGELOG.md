# Changelog

All notable changes to the NPTEL Exam Practice Hub.

## 2026-10-24 — Cache-busting for app assets

- `index.html` now references the app assets with a version token
  (`assets/css/style.css?v=20261024a`, `assets/js/app.js?v=20261024a`), and
  `vercel.json` serves `/` and `/index.html` with
  `Cache-Control: public, max-age=0, must-revalidate` while versioned
  `/assets/*` files get `public, max-age=31536000, immutable`. Fixes shipped
  to `app.js`/`style.css` now actually reach phones instead of being hidden
  behind stale browser cache copies (the tag-overlap fix was live but
  invisible on cached devices).
- STANDING RULE: every future push that changes `assets/js/app.js` or
  `assets/css/style.css` MUST bump the `?v=` token in `index.html` in the
  same commit (e.g. `?v=20261024a` → next date/letter). A push that changes
  the assets without bumping the token will not reach users' phones.

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
