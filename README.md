<div align="center">

<img src="https://img.shields.io/badge/NPTEL-Geography_&_Environment-101C4A?style=for-the-badge" alt="NPTEL Geography & Environment"/>

# 📚 NPTEL Exam Practice Hub

### Practice Today. Score Higher Tomorrow.

**A free, mobile-first practice app for NPTEL students — 130 verified assignment questions for
*Geography & Environment*, with submit-all week tests, timed mocks, concept lessons and smart revision.**

[![🚀 Live Demo](https://img.shields.io/badge/🚀_OPEN_THE_LIVE_APP-nptel--exam--practice--hub.vercel.app-2878F9?style=for-the-badge)](https://nptel-exam-practice-hub.vercel.app)

[![Questions](https://img.shields.io/badge/Questions-130_verified-12A66A?style=flat-square)](data/questions.json)
[![Weeks](https://img.shields.io/badge/Weeks-0--12-2878F9?style=flat-square)](#-question-bank--verification)
[![License](https://img.shields.io/badge/License-MIT-F5C451?style=flat-square)](LICENSE)
[![Stack](https://img.shields.io/badge/Stack-Vanilla_HTML·CSS·JS-101C4A?style=flat-square)](docs/ARCHITECTURE.md)

**👉 [nptel-exam-practice-hub.vercel.app](https://nptel-exam-practice-hub.vercel.app)**

*No build step. No sign-up server. No cost. Just open and practise.*

**Built by [Thunderdoc](https://github.com/Thunderdoc)**

</div>

---

## 🎯 What it is — and who it's for

The NPTEL Exam Practice Hub turns the *Geography & Environment* assignment set into a complete
exam-preparation app that runs entirely in the browser. It is made for **students enrolled in the
course** who want to practise the real assignment questions the way the exam actually feels:
attempt everything first, submit once, then analyse.

- 📱 **Mobile-first** — designed for a phone screen first, comfortable on desktop too
- 🌗 **Light & dark themes**, remembered per account
- 🔒 **Private by design** — accounts and progress live only on your own device (see *Honesty* below)
- ⚡ **Instant** — a dependency-free static site; no loading spinners, no server round-trips

---

## ✨ Features

### 📝 Practice — submit-all, like the real exam
No per-question peeking: in every practice mode you attempt **all** questions first, then submit
**once** and get your score plus a full green/red review (wrong answers show the correct answer in green).

- **Week Test** — one week at a time, Weeks 0–12, submit-all with an unanswered count before you confirm
- **All Questions** — the full 130-question bank in one session
- **Random Practice** — a shuffled set from the whole bank
- **Custom Practice Generator** — pick weeks × number of questions × pool (New / Incorrect / Bookmarked)
- **Bookmarked & Wrong Answers practice** — focused sessions built from your own bookmarks and mistakes

### ⏱️ Timed Mock
Exam-style timed sessions with a question palette (answered / marked-for-review / current),
navigation that never reveals answers mid-attempt, a submit confirmation, and a complete
post-submit analysis.

### 📖 Learn — not just practice
- **Learn from Zero** — 12 short lessons covering the concepts the questions test, each with a
  mini-quiz built from real bank questions (labelled honestly: *not official NPTEL content*)
- **Study Questions** — pick any week (0–12) and simply *read* that week's questions with all
  four options and the **correct answer highlighted in green**. The fastest way to revise the night before.

### 🔁 Revision
- **Wrong Answers** — every question you've missed, sorted by how often you've missed it, with one-tap weak-week practice
- **Bookmarks** — save any question and revise them together
- **Quick Revision flashcards** — flip, self-mark *Remembered* / *Need Revision*
- **Notes** — your own notes on questions, kept per account

### 📊 Know where you stand
- **Exam Readiness Score** — coverage + accuracy + tests completed, with the formula shown in the
  app and labelled an *estimate, not a guarantee*
- **Performance graph** — week-wise accuracy bars from your own attempts, weakest week marked
- **Exam Countdown** — set your exam date; the app counts down and shortcuts you to your weakest week
- **Search** — full-text search across all 130 questions and options, filterable by week

### 🛠️ Accounts, reports & admin
- **Device-local accounts** — sign up / log in in the browser; passwords are hashed, each
  account's data is fully separate, and everything persists across logout/login on the same device
- **Report an Issue** — flag any question; reports appear in the Admin panel on that device
- **"Did this app help you?"** — a 👍/👎 student feedback prompt, counted locally on the device
- **Admin panel** — a sign-in-gated panel that separates **real site traffic** (a link to the
  project's Vercel Web Analytics) from **this device's** accounts, attempts, issues and feedback
  counts — and says plainly that cross-device per-student data needs a backend (Phase 2)

---

## 📚 Question bank & verification

`data/questions.json` holds all **130 questions** — 4 options each, one accepted answer each:

| Weeks | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Questions** | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 |

**How the answers were verified**

- 🎓 **Weeks 1–12 are complete and portal-verified.** On 2026-10-23, every one of the 120
  questions was re-verified one-by-one against the Accepted Answers in the course owner's own
  NPTEL portal — **120/120 match, 0 differences**.
- 🔁 The original 113-question export records every answer **twice** (a ✓ mark *and* a
  `Correct Answer:` line) — an automated comparison found **0 mismatches**.
- 🧩 The 7 questions missing from that export (W6 Q10 · W7 Q1, Q9 · W9 Q1 · W10 Q1 · W11 Q1, Q5)
  were **recovered from the portal — never invented**.
- 🌱 **Week 0** is the course orientation week. The portal shows no accepted answers for it, so
  its 10 answers were sourced and verified from **public course material** — the only answers in
  the bank not taken from an NPTEL accepted-answer record, and labelled as such in the app.
- 🏛️ NPTEL publishes no public answer key for this course (keys live in the enrolled portal) —
  **no answer is ever "corrected" from a third-party site.**

Full report: **[docs/VERIFICATION.md](docs/VERIFICATION.md)**

> **No explanations:** the source contains no explanations for any question, so the app never
> invents one — it honestly says *"No explanation in source."* Your own notes are labelled as yours.

---

## 🚀 Quick start (students)

1. Open **[nptel-exam-practice-hub.vercel.app](https://nptel-exam-practice-hub.vercel.app)**
2. Create your account (it stays on your device) and pick the subject
3. Set your **exam date** on the Account page so the countdown can guide you
4. Start a **Week Test**, or open **Learn → Study Questions** to read a week with answers in green
5. Revisit **Revision** for your wrong answers and bookmarks before the exam

**Run it locally**

```bash
git clone https://github.com/Thunderdoc/nptel-exam-practice-hub.git
cd nptel-exam-practice-hub
python3 -m http.server 8000   # then open http://localhost:8000
```

**Deploy your own copy:** import this repo in [Vercel](https://vercel.com/new) with framework
preset **Other** — no build command, no environment variables. Pushes to `main` deploy automatically.

---

## 🧰 Tech

- **Vanilla HTML, CSS & JavaScript** — zero dependencies, zero build step
- **Static hosting on Vercel**, auto-deployed from `main`
- **Persistence:** browser `localStorage`, per account, on-device only
- The question bank lives both as `data/questions.json` and embedded in `assets/js/app.js`
  (identical copies) so the app also runs as a single self-contained page

## 🗂️ Project structure

```
nptel-exam-practice-hub/
├── index.html              # App markup (screens & templates)
├── assets/
│   ├── css/style.css       # Design system — light + dark themes
│   └── js/app.js           # App logic — accounts, practice, mock, learn, revision, admin
├── data/
│   └── questions.json      # The verified 130-question bank (Weeks 0–12)
├── docs/
│   ├── ARCHITECTURE.md     # How the code is organised + how to extend the bank
│   └── VERIFICATION.md     # How every accepted answer was verified
├── CHANGELOG.md
├── LICENSE                 # MIT
└── vercel.json             # Static deploy config
```

How the code is organised, section by section: **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**

## ➕ Adding future subjects & sessions

The bank is **fully data-driven** — week lists, counts, pools and statistics are derived from the
data at runtime, so a new NPTEL session (questions change every session) or a new subject is a
**data change, not a code change**: add verified entries to `data/questions.json` and the embedded
bank in the same format, add a week title if needed, update the stated totals, and push. The full
procedure (including session versioning) is in **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

---

## 🗺️ Roadmap

**Phase 2 (backend)** — planned, *not* in this static version:

- Synced accounts that follow a student across devices
- Global admin analytics (real per-student attempts & feedback across devices)
- Leaderboards and cohort views for teachers

Until then, the app is deliberately honest: everything it shows is either from the verified
question bank or from **your own device's** data.

---

## 📄 License

[MIT](LICENSE) — free to use, learn from and build on.

**Built by [Thunderdoc](https://github.com/Thunderdoc)** — for NPTEL students preparing for their exam. Good luck! 🍀
