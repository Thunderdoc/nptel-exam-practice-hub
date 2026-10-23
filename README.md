# NPTEL Exam Practice Hub

A simple, mobile-first practice app for NPTEL **Geography & Environment** (Weeks 1–12), built for students revising assignments before the exam.

**Built by [Thunderdoc](https://github.com/Thunderdoc)**

## Project structure

```
.
├── index.html            # App markup (screens, templates)
├── assets/
│   ├── css/style.css     # Full design system (light + dark themes)
│   └── js/app.js         # App logic: accounts, practice engine, mock, learn, revision
├── data/
│   └── questions.json    # The verified 113-question bank (same data the app runs on)
├── docs/
│   └── VERIFICATION.md   # How every accepted answer was double-verified
└── vercel.json           # Static deploy config
```

No build step and no dependencies — plain HTML, CSS and JavaScript.

## What it does

- Sign up / log in (device-local accounts), then a one-time subject selection: **Geography & Environment**
- **Week-wise Practice** (check each answer) and **Week Test** (answer all, submit once, then results)
- **All Questions**, **Random / Custom Practice Generator** (weeks × count × new/incorrect/bookmarked)
- **Timed Mock Test** with question palette, auto-submit and trophy results
- **Revision**: Wrong Answers (most-missed first), Bookmarks, Quick Revision flashcards, Notes
- **Learn From Zero**: 12 lessons built from the concepts the real questions test, each with a mini-quiz of real questions
- Search, Exam Countdown, Exam Readiness Score (labelled estimate), Report-a-Wrong-Answer
- Light theme by default, dark theme one tap away — designed for **mobile and tablet only**

## Question bank

`data/questions.json` contains all **113 questions** extracted from the supplied NPTEL assignment export, each with 4 options and the source's accepted answer.

Per-week counts: W1–W5 = 10 each, W6 = 9, W7 = 8, W8 = 10, W9 = 9, W10 = 9, W11 = 8, W12 = 10.
Some question numbers are absent from the supplied source itself (W6 Q10; W7 Q1, Q9; W9 Q1; W10 Q1; W11 Q1, Q5) — they are shown honestly as gaps, never invented.

## Answer accuracy

Every accepted answer is recorded **twice** in the source (a ✓ mark and a "Correct Answer:" line). An automated comparison of all 113 found **0 mismatches**, and a sample was cross-checked against independent NPTEL course materials with 0 conflicts. NPTEL publishes no public answer key for this course (keys live inside the enrolled portal), so the supplied quiz export is the authoritative source. See [docs/VERIFICATION.md](docs/VERIFICATION.md).

The source contains **no explanations**, so the app never invents one. Lesson notes in Learn are the app's own supplementary study material and are labelled as such — they are not official NPTEL content.

## Run it

Serve the folder with any static server (for example `npx serve .`) or deploy it to any static host, then open it in a browser. Opening `index.html` directly from disk also works in most browsers.

### Deploy on Vercel

Import this repository in Vercel (framework preset: **Other**). No build command, no environment variables.

## Data and privacy

Accounts, progress, bookmarks, notes and attempts are stored in the student's own browser on their device (per-account, separated). There is no server backend in this version, and the app states that honestly in its Source & Limits page.

## Content note

Question text comes from a supplied NPTEL assignment export and is included for students' personal exam revision. Review content rights before redistributing beyond that purpose.
