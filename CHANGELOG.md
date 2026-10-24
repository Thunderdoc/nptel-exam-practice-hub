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
- Welcome screen lower section redesigned (owner order 2026-10-24):
  the subject meta line is now a subject chip + a stats strip
  (Weeks 0–12 · 130 questions, both nowrap — no awkward word-wrap
  splits), and the footer is a composed, centred block pinned to the
  viewport bottom; the dead gap between the note and the footer is
  gone (was ~154px of padding/margin clearance for a bottom nav the
  welcome screen does not show). Headline and both sign-in buttons
  untouched; note wording, credit and links unchanged.
- Google sign-in fixed for phones (owner report 2026-10-24: tapping
  "Continue with Google" and confirming on Google's side landed back
  on the same welcome screen, and the Firebase process felt slow).
  Root cause was the tap/round-trip layer, not the session layer:
  while the SDK was still loading, the tap did nothing except a
  "Connecting…" toast, and the popup round-trip is fragile on phones.
  Now: while the SDK loads, the Google + Email buttons render
  DISABLED showing "Connecting…"; while any sign-in is in flight the
  tapped button is disabled showing "Signing in…" (no double-tap
  breakage); on phones (≤640px) Google uses a full-page redirect
  instead of a popup (desktop keeps popup); a failed redirect
  surfaces its error as a toast at boot instead of failing silently.
  Persistence mapping (ticked = stays signed in, unticked = session
  only), owner-email logic, migration and questions are unchanged.
- Welcome meta block REMOVED (owner order 2026-10-24, supersedes the
  chip/strip redesign above): the login page now shows NO subject
  name, NO week range and NO question count — the subject chip and
  the stats strip (and their CSS) are gone entirely. Kept exactly:
  headline, Google button, Email button, the "One account, every
  device…" note word-for-word, and the redesigned footer/credit
  block (brand, "Built by Thunderdoc", Source & Limits · Admin).
  The flex-column layout absorbs the removal cleanly (footer still
  pinned to the viewport bottom, no new void).

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
