# Architecture — NPTEL Exam Practice Hub

A dependency-free static web app: plain HTML, CSS and JavaScript. No build
step, no framework, no server. Everything runs in the student's browser.

## Layout

| Path | Role |
| --- | --- |
| `index.html` | Markup only: the screens (views) and templates the JS fills in. |
| `assets/css/style.css` | The whole design system. Sectioned by area (tokens/themes, base, header, welcome/auth, cards, practice, mock, revision, learn, results, admin). Light theme is the default; dark theme is the same tokens under `[data-theme="dark"]`. |
| `assets/js/app.js` | All application logic, organised in labelled sections (see below). |
| `data/questions.json` | The verified question bank the app embeds: 130 questions (Weeks 0–12), 4 options each, one accepted answer per question. |
| `docs/VERIFICATION.md` | How the accepted answers were double-verified against the source. |

## How app.js is organised

`app.js` is written as a sequence of clearly delimited sections, in load order:

1. **Question data** — the embedded bank (`QUESTIONS`), identical to
   `data/questions.json`.
2. **Storage layer** — all persistence goes through one small API over
   `localStorage`: accounts (passwords stored hashed, never plain text),
   per-account progress (attempts, bookmarks, notes, mistakes, learn
   progress, exam date, theme). One account's data is never visible to
   another.
3. **State + routing** — a single `state` object and a view switcher; the
   bottom navigation renders Home / Learn / Practice / Revision / Search.
4. **Auth + subject selection** — sign up, log in, forgot-password (device
   local), then the mandatory subject selection (one subject:
   Geography & Environment). All practice data is keyed per subject so more
   subjects can be added later without a rewrite.
5. **Practice engine** — week practice (check-as-you-go), the submit-all
   Week Test (no reveals until submit, unanswered-count confirmation),
   All Questions, Random, and the Custom Practice Generator
   (weeks × count × New/Incorrect/Bookmarked pools).
6. **Mock test** — timed sessions with a question palette
   (answered / marked-for-review / current), submit confirmation and
   auto-submit at expiry.
7. **Revision** — Wrong Answers (sorted by miss count), Bookmarks,
   Quick Revision flashcards, Notes.
8. **Learn From Zero** — 12 lessons derived only from concepts the real
   questions test, each with a mini-quiz of real bank questions; lesson
   mistakes feed the same mistake store as practice.
9. **Search, Readiness, Reports, Admin preview** — full-text search over
   the bank; the Exam Readiness Score (coverage + accuracy + tests, formula
   shown in-app, labelled an estimate); per-question issue reports stored
   locally and surfaced in the admin preview with real aggregates.

## Data honesty rules (do not regress these)

- Answers come only from verified sources — see `docs/VERIFICATION.md`.
  Never "correct" an answer from a third-party site.
- The source has no explanations; the UI says so instead of inventing one.
- The 7 question numbers missing from the original PDF export (W6 Q10;
  W7 Q1, Q9; W9 Q1; W10 Q1; W11 Q1, Q5) were recovered from the owner's own
  NPTEL portal on 2026-10-23; Weeks 1–12 are now complete (120/120
  portal-verified). Week 0's answers come from public course material (the
  portal shows no accepted answers for Week 0) and are labelled as such in
  the app — they are the only non-portal-verified answers in the bank.
- Learn lessons are the app's own supplementary notes and are labelled
  "not official NPTEL content".
- Accounts are device-local by design (no backend in this version) and the
  app states that plainly on its Source & Limits page.

## Extending the bank: future sessions & new subjects

The bank is **fully data-driven**: week lists, counts, practice pools, mock
setup, search filters and statistics are all derived from the bank data at
runtime (`BANK` in `app.js`, mirrored by `data/questions.json`). Nothing about
the current 130 questions is hardcoded, so extending the app is a data change,
not a code change.

NPTEL changes assignment questions **every session**, and more subjects are
planned. To add a new session's set or a new subject:

1. Collect the new set's questions with their accepted answers from an
   authoritative source (the enrolled portal / an official export) and verify
   them the way `docs/VERIFICATION.md` describes. Never invent answers.
2. Add one entry per question to `data/questions.json` **and** to the embedded
   `BANK` array in `assets/js/app.js`, in the existing format
   (`id`, `week`, `number`, `question`, `options` A–D, `correct_letter`,
   `correct_text`), keeping the two copies identical. Use ids that cannot
   collide with the current set (today: `w<week>-q<number>`).
3. If the new set has weeks the app has no title for, add titles to
   `WEEK_TITLES` in `app.js` — one line per week.
4. Re-check any copy that states a total (README, in-app Source & Limits
   page) and push. Counts elsewhere follow the data automatically.

**Bank versioning by session:** treat each NPTEL session's question set as a
versioned snapshot of the bank. Keep the previous session's
`data/questions.json` in git history (it is — every bank change is a commit),
so any session's set can be restored or compared. When subjects/sessions are
later offered side-by-side in the UI, the planned next step is to tag each
entry with `subject` and `session` fields and filter the bank on the
student's subject selection (the storage layer already keys progress per
subject); until then, one bank = one subject + session, swapped as data.
