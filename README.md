<div align="center">

<img src="https://img.shields.io/badge/NPTEL-Geography_&_Environment-101C4A?style=for-the-badge" alt="NPTEL Geography & Environment"/>

# 📚 NPTEL Exam Practice Hub

### Practice Today. Score Higher Tomorrow.

[![Live Demo](https://img.shields.io/badge/🚀_OPEN_THE_LIVE_APP-nptel--exam--practice--hub.vercel.app-2878F9?style=for-the-badge)](https://nptel-exam-practice-hub.vercel.app)

[![Questions](https://img.shields.io/badge/Questions-113_verified-12A66A?style=flat-square)](data/questions.json)
[![Weeks](https://img.shields.io/badge/Weeks-1--12-2878F9?style=flat-square)](#-question-bank--answer-accuracy)
[![License](https://img.shields.io/badge/License-MIT-F5C451?style=flat-square)](LICENSE)
[![Stack](https://img.shields.io/badge/Stack-Vanilla_HTML·CSS·JS-101C4A?style=flat-square)](docs/ARCHITECTURE.md)
[![Stars](https://img.shields.io/github/stars/Thunderdoc/nptel-exam-practice-hub?style=flat-square)](https://github.com/Thunderdoc/nptel-exam-practice-hub/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/Thunderdoc/nptel-exam-practice-hub?style=flat-square)](https://github.com/Thunderdoc/nptel-exam-practice-hub/commits/main)

**A free, mobile-first practice app for NPTEL students.**
Week-wise practice · Submit-all week tests · Timed mocks · Concept lessons · Smart revision —
**113 assignment questions with double-verified accepted answers**, right in your browser.

*No build step. No sign-up server. No cost. Just open and practise.*

### 👉 [nptel-exam-practice-hub.vercel.app](https://nptel-exam-practice-hub.vercel.app)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Thunderdoc/nptel-exam-practice-hub)

**Built by [Thunderdoc](https://github.com/Thunderdoc)**

</div>

---

## 📖 Contents

[Why this app](#-why-this-app) · [Features](#-features) · [How a student uses it](#-how-a-student-uses-it) ·
[Project structure](#️-project-structure) · [Run locally](#️-run-it-locally) · [Question bank & accuracy](#-question-bank--answer-accuracy) ·
[Keyboard shortcuts](#️-keyboard-shortcuts) · [FAQ](#-faq) · [Contributing](#-contributing) · [Roadmap](#️-roadmap) · [License](#-license)

---

## 💡 Why this app

NPTEL weekly assignments decide a big part of the final score — and the questions in the
exam come from the same pool. Students usually revise from scattered PDFs and screenshots
with no way to *practise actively*, track mistakes, or learn the concepts behind the questions.

This hub fixes that:

- ✅ **Practise, don't just read** — every question is interactive, with instant checking
- ✅ **Trust the answers** — every accepted answer is verified *twice* in the source itself (see below)
- ✅ **Learn the concepts** — 12 short lessons explain what the questions actually test
- ✅ **Fix your weak spots** — wrong answers collect in one place, sorted by how often you miss them
- ✅ **Works on any phone** — designed mobile-first, because that's where students study

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🔐 Accounts that stay on your device
Sign up / log in right in the browser. Passwords are hashed, every account's data is kept separate, and everything survives logout/login on the same device.

### 🎯 One honest subject
**Geography & Environment** — the latest question set, Weeks 1–12, 113 questions. No fake "coming soon" subjects.

### 📝 Week-wise Practice
Pick any week and check each answer as you go — the gentle way to revise.

### ✅ Submit-All Week Test
The exam feel: answer the whole week, submit **once**, then get your score, accuracy and a full review. Unanswered questions are counted honestly.

</td>
<td width="50%" valign="top">

### 🎲 Custom Practice Generator
Build your own set — choose the weeks, the number of questions, and the pool: **New**, **Incorrect**, or **Bookmarked**.

### ⏱️ Timed Mock Test
Full mock with a live timer, a question palette (answered / marked-for-review / current), submit confirmation and trophy results.

### 🌱 Learn from Zero
12 concept lessons — one per week — built **only** from concepts the real questions test, each ending with a mini-quiz of real bank questions. Labelled honestly as study notes, not official NPTEL content.

### 🔁 Revision that targets weakness
**Wrong Answers** (most-missed first) · **Bookmarks** · **Quick-Revision flashcards** · your own **Notes** on any question.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🔍 Instant Search
Find any question in the whole bank in one tap — with your attempt and bookmark state shown.

</td>
<td width="50%" valign="top">

### 📅 Exam Countdown + Readiness Score
Set your exam date and see the days left on Home, plus a readiness estimate built from your coverage + accuracy + tests taken. The formula is shown in the app — it is labelled an **estimate, not a guarantee**.

</td>
</tr>
</table>

**Plus:** light theme by default with a proper dark-navy theme one tap away · resume an unfinished session ·
report a wrong answer from any question · an honest *Source & Limits* page inside the app.

---

## 🎓 How a student uses it

```
1. Open the live link            →  2. Create an account      →  3. Select the subject
        nptel-exam-practice-hub.vercel.app      (stays on your phone)     Geography & Environment

4. LEARN the week's concepts     →  5. PRACTISE the week      →  6. Take the WEEK TEST
        Learn from Zero                    check as you go             submit once, see your score

7. REVISE your mistakes          →  8. Sit a timed MOCK        →  9. Walk in ready 🎉
        most-missed first                  exam conditions             countdown hits zero
```

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

No dependencies, no bundler, no build step — plain HTML, CSS and JavaScript, formatted and
sectioned so the code reads like a project, not a dump. Start with **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

---

## ▶️ Run it locally

```bash
git clone https://github.com/Thunderdoc/nptel-exam-practice-hub.git
cd nptel-exam-practice-hub
npx serve .
```

Then open the printed URL. (Opening `index.html` directly also works in most browsers.)

**Deploy your own copy:** import this repo in [Vercel](https://vercel.com/new) with framework
preset **Other** — no build command, no environment variables. Pushes to `main` deploy automatically.

---

## 📚 Question bank & answer accuracy

`data/questions.json` holds all **113 questions** extracted from the supplied NPTEL assignment
export — 4 options each, one accepted answer each.

| Weeks | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Questions** | 10 | 10 | 10 | 10 | 10 | 9 | 8 | 10 | 9 | 9 | 8 | 10 |

Some question numbers are **missing from the supplied source itself**
(W6 Q10 · W7 Q1, Q9 · W9 Q1 · W10 Q1 · W11 Q1, Q5) — they are shown honestly as gaps, **never invented**.

**How the answers were verified**

- 🔁 Every accepted answer is recorded **twice** in the source (a ✓ mark *and* a `Correct Answer:` line) —
  an automated comparison of all 113 found **0 mismatches**
- 🔍 A sample was cross-checked against independent NPTEL course materials — **0 conflicts**
- 🏛️ NPTEL publishes no public answer key for this course (keys live in the enrolled portal),
  so the supplied export is authoritative — **no answer is ever "corrected" from a third-party site**

Full report: **[docs/VERIFICATION.md](docs/VERIFICATION.md)**

The source contains **no explanations**, so the app never invents one — where an explanation
would normally appear, it honestly says *"No explanation in source."*

---

## ⌨️ Keyboard shortcuts

| Key | Action |
| --- | --- |
| `1` – `4` | Select an option |
| `Enter` | Check answer / go next |
| `←` / `→` | Previous / next question |
| `B` | Bookmark the question |
| `M` | Mark for review (in tests & mocks) |

---

## ❓ FAQ

**Is it free?** — Yes, completely. No ads, no sign-up fees, nothing locked.

**Where is my account stored?** — In your own browser, on your own device. There is no server
in this version — the app tells you this itself. A different phone means a fresh account.

**Are the answers really correct?** — They are the source export's accepted answers, verified
two independent ways with 0 mismatches. See [VERIFICATION.md](docs/VERIFICATION.md). If you ever
spot a mismatch, use **Report an issue** in the app or open a GitHub issue with the week + question number.

**Does it work on my phone?** — Yes — it is designed for phones (320–430px) and tablets (768–1024px) first.
On a wide screen it simply centres at tablet width.

**Can I add another subject?** — The data model already keys everything per subject, so new
question sets can be added without a rewrite. See the roadmap below.

---

## 🤝 Contributing

Found a wrong answer or a bug?

1. Note the **week + question number**
2. Open an [issue](https://github.com/Thunderdoc/nptel-exam-practice-hub/issues), or tap **Report an issue** inside the app

Answer changes are accepted **only** against the supplied source export — never from memory
or third-party sites. That rule is what keeps the bank trustworthy for students.

---

## 🗺️ Roadmap

- [ ] More NPTEL subjects (the per-subject data model is already in place)
- [ ] Optional server accounts for cross-device sync (today: honest device-local accounts)
- [ ] Printable week-wise question sheets for offline revision

---

## 📄 License

[MIT](LICENSE) for the application code — use it, learn from it, build on it.

The question content in `data/questions.json` comes from a supplied NPTEL assignment export and
is included for students' **personal exam revision**. Please review content rights before
redistributing it beyond that purpose.

---

<div align="center">

### ⭐ If this helped your prep, star the repo — it helps other students find it.

**Built by [Thunderdoc](https://github.com/Thunderdoc)** · For NPTEL students · *Practice Today. Score Higher Tomorrow.*

</div>
