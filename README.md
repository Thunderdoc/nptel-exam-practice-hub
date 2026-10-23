<div align="center">

# 📚 NPTEL Exam Practice Hub

### Geography & Environment · Weeks 1–12

**Practice Today. Score Higher Tomorrow.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-nptel--exam--practice--hub.vercel.app-2878F9?style=for-the-badge)](https://nptel-exam-practice-hub.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-12A66A?style=for-the-badge)](LICENSE)
[![Questions](https://img.shields.io/badge/Questions-113_verified-F5C451?style=for-the-badge)](data/questions.json)
[![Stack](https://img.shields.io/badge/Stack-Vanilla_HTML·CSS·JS-101C4A?style=for-the-badge)](docs/ARCHITECTURE.md)

*A free, mobile-first practice app for NPTEL students — week-wise practice, submit-all tests,
timed mocks, concept lessons and smart revision, all in the browser. No build step, no sign-up server.*

**Built by [Thunderdoc](https://github.com/Thunderdoc)**

</div>

---

## 🚀 Try it live

**👉 [nptel-exam-practice-hub.vercel.app](https://nptel-exam-practice-hub.vercel.app)**

Open the link on your phone, create your account (it stays on your device), pick
**Geography & Environment**, and start practising. That's it.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Thunderdoc/nptel-exam-practice-hub)

---

## ✨ Features

| | |
| --- | --- |
| 🔐 **Accounts** | Sign up / log in on your device — passwords hashed, your data stays yours and is separated per account |
| 🎯 **Subject selection** | One honest subject: **Geography & Environment** (Weeks 1–12, 113 questions) |
| 📝 **Week-wise Practice** | Practise any week and check each answer as you go |
| ✅ **Week Test** | The real exam feel — answer everything, submit once, then see your score and full review |
| 🎲 **Custom Generator** | Pick weeks × question count × pool (New / Incorrect / Bookmarked) and build your own set |
| ⏱️ **Timed Mock Test** | Question palette, mark-for-review, submit confirmation, trophy results |
| 🌱 **Learn from Zero** | 12 concept lessons built from what the questions actually test — each with a mini-quiz of real questions |
| 🔁 **Revision** | Wrong Answers (most-missed first), Bookmarks, Quick-Revision flashcards, personal Notes |
| 🔍 **Search** | Find any question in the bank instantly |
| 📅 **Exam Countdown + Readiness** | Days-left on your home screen and an honest readiness estimate (formula shown, labelled an estimate) |
| 🌗 **Light & Dark themes** | Light by default, dark navy one tap away — designed for **mobile and tablet only** |

---

## 🗂️ Project structure

```
nptel-exam-practice-hub/
├── index.html              # App markup (screens & templates)
├── assets/
│   ├── css/style.css       # Design system — light + dark themes
│   └── js/app.js           # App logic — accounts, practice, mock, learn, revision
├── data/
│   └── questions.json      # The verified 113-question bank
├── docs/
│   ├── ARCHITECTURE.md     # How the code is organised, section by section
│   └── VERIFICATION.md     # How every accepted answer was double-verified
├── CHANGELOG.md
├── LICENSE
└── vercel.json             # Static deploy config
```

No dependencies, no bundler, no build step — plain HTML, CSS and JavaScript.
How the code is organised internally: **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

---

## ▶️ Run it locally

```bash
git clone https://github.com/Thunderdoc/nptel-exam-practice-hub.git
cd nptel-exam-practice-hub
npx serve .
```

Then open the printed URL. (Opening `index.html` directly also works in most browsers.)

---

## 📖 Question bank & answer accuracy

`data/questions.json` holds all **113 questions** extracted from the supplied NPTEL
assignment export — 4 options each, one accepted answer each.

**Per-week counts:** W1–W5 = 10 · W6 = 9 · W7 = 8 · W8 = 10 · W9 = 9 · W10 = 9 · W11 = 8 · W12 = 10

Some question numbers are missing from the supplied source itself
(W6 Q10 · W7 Q1, Q9 · W9 Q1 · W10 Q1 · W11 Q1, Q5) — they are shown honestly as gaps, **never invented**.

**How the answers were verified**

- Every accepted answer is recorded **twice** in the source (a ✓ mark and a `Correct Answer:` line) —
  an automated comparison of all 113 found **0 mismatches**
- A sample was cross-checked against independent NPTEL course materials — **0 conflicts**
- NPTEL publishes no public answer key for this course, so the supplied export is authoritative —
  no answer is ever "corrected" from a third-party site

Full report: **[docs/VERIFICATION.md](docs/VERIFICATION.md)**

The source contains **no explanations**, so the app never invents one. The Learn lessons are the
app's own supplementary study notes and are labelled as such — not official NPTEL content.

---

## 🔒 Data & privacy

Accounts, progress, bookmarks, notes and attempts live in the student's own browser on their
own device (per-account, separated). There is **no server backend** in this version — and the
app says so plainly on its *Source & Limits* page.

## 🤝 Contributing

Found a wrong answer or a bug? Open an issue with the week + question number — or use the
**Report an issue** button inside the app and tell the maintainer what it showed.
Answer changes are only accepted against the supplied source export (see VERIFICATION.md).

## 📄 License

[MIT](LICENSE) for the application code. The question content in `data/questions.json` comes
from a supplied NPTEL assignment export, included for students' personal exam revision —
please review content rights before redistributing it beyond that purpose.

---

<div align="center">

**Built by [Thunderdoc](https://github.com/Thunderdoc)** · For NPTEL students preparing for their exam · *Practice Today. Score Higher Tomorrow.*

</div>
