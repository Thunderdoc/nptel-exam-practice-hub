# Architecture — NPTEL Exam Practice Hub

A dependency-free static web app: plain HTML, CSS and JavaScript. No build
step, no framework, no server. Everything runs in the student's browser.

## Layout

| Path | Role |
| --- | --- |
| `index.html` | Markup only: the screens (views) and templates the JS fills in. |
| `assets/css/style.css` | The whole design system. Sectioned by area (tokens/themes, base, header, welcome/auth, cards, practice, mock, revision, learn, results, admin). Light theme is the default; dark theme is the same tokens under `[data-theme="dark"]`. |
| `assets/js/app.js` | All application logic, organised in labelled sections (see below). |
| `data/questions.json` | The verified question bank the app embeds: 113 questions, 4 options each, one accepted answer per question. |
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

- Answers come only from the supplied source export — see
  `docs/VERIFICATION.md`. Never "correct" an answer from a third-party site.
- The source has no explanations; the UI says so instead of inventing one.
- Question numbers missing from the source (W6 Q10; W7 Q1, Q9; W9 Q1;
  W10 Q1; W11 Q1, Q5) are gaps in the source itself and are shown as such.
- Learn lessons are the app's own supplementary notes and are labelled
  "not official NPTEL content".
- Accounts are device-local by design (no backend in this version) and the
  app states that plainly on its Source & Limits page.
