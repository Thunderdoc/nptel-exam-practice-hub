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
## 2026-10-24 — Phase 2: Firebase backend (real accounts + sync) — IN PREVIEW, NOT YET ON MAIN

> Status (corrected): this build is live only on the `preview/phase2-switch`
> branch (Vercel preview deployment). The switch to `main` is pending the
> final live proofs (in-browser session sync on the preview URL and the
> owner's Google sign-in students-list check). Do not describe Phase 2 as
> shipped until that switch push lands.

- Real server accounts via Firebase Authentication: **Google sign-in**
  and **email/password** (auth screens redesigned around the same
  forms). Remember me now drives Firebase session persistence (ticked:
  stays signed in across browser restarts; unticked: this browser
  session only). The app stores no passwords.
- Student data (attempts, bookmarks, notes, sessions, quick-revision
  flags, feedback, exam date) now lives in Cloud Firestore
  (`users/{uid}`) and syncs across devices; local storage is a cache.
- One-time migration: progress created under the old device-local
  accounts is uploaded/merged into the new Firebase account on first
  sign-in. Old device-local accounts are retired (see docs/BACKEND.md).
- Admin panel rebuilt around **global** data: registered users,
  sessions, per-week and per-question usage, global feedback, all
  reported issues, and a **students list** with per-student progress
  (name/email, sessions, answers + accuracy, weakest weeks, last
  activity) — readable only by the owner's verified Google identity
  under the published rules. The "(this device)" labels and the
  "needs a backend" banner are gone. Owner's Google account gets a
  menu entry + gate bypass; the password gate remains as fallback.
- Added `firestore.rules`, `firebase.json`, `docs/BACKEND.md` and
  `assets/js/firebase-config.js` (project `nptel-exam-practice-hub`).

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
