# Backend — Firebase (Phase 2)

The hub is a static site on Vercel. Phase 2 adds a real backend with
**Firebase Authentication** + **Cloud Firestore**, wired in entirely from
the client (no server of our own, no build step). The question bank
(`data/questions.json`) stays a static file and never moves to the backend.

- Sign-in code: `assets/js/app.js` → `SECTION JS-3b · CLOUD`
- Project config: `assets/js/firebase-config.js` (values are project
  identifiers, not secrets — access control is the security rules)
- Security rules: `firestore.rules` (repo root)

## Accounts

Two sign-in providers, both Firebase Authentication:

1. **Google** — prominent "Continue with Google" button (popup flow).
   Name and email come from the Google account.
2. **Email/password** — the original forms, unchanged visually, mapped
   onto Firebase (`createUserWithEmailAndPassword` /
   `signInWithEmailAndPassword` / `sendPasswordResetEmail`).

The session persists on the device (`browserLocalPersistence`): a student
who signs in once stays signed in across reloads and browser restarts
until they explicitly log out. The app itself stores **no passwords**.

The in-app **Admin gate** (username `admin` + the pre-existing salted
SHA-256 password check) is unchanged and still guards the panel reached
from the footer link. Additionally, when the signed-in account's email
is the owner's (`ankitraj2163@gmail.com`), the Admin entry appears in
that account's menu and the gate opens without the password. Students
never see an Admin entry anywhere.

## Firestore schema

### `users/{uid}` — one document per student (owner-only access)

| Field | Content |
|---|---|
| `name`, `email` | From the auth profile |
| `createdAt`, `updatedAt` | Server timestamps |
| `migratedFromLocal` | `true` if pre-backend device data was uploaded |
| `data` | The student's study record (below) |

`data` mirrors the app's existing per-account record: `subject`,
`learn {done, last}`, `attempts {qid: {total, correct, wrong, streak,
last, lastPicked, lastDate, hist[]}}`, `bookmarks[]`, `notes {qid:
{concept, why, mnemonic}}`, `sessions[]` (history summaries),
`examDate`, `qrFlags {qid: "rem"|"need"}`, `feedback` (`"up"|"down"`),
`issues[]` (local copy of own reports), `themePref`.

Two deliberate trims keep the document well under Firestore's 1 MiB
limit: the in-progress session (`activeSes`) is never uploaded (it is
device-bound), and stored session history is capped at 30 entries with
the per-session option order removed.

Sync behaviour: every local `save()` schedules a debounced (900 ms)
write of `data`. On sign-in the server document is loaded and becomes
the working state; the local storage copy remains as an offline cache
(Firestore's own IndexedDB persistence is also enabled). If the server
is unreachable, the app keeps working from cache and syncs later.

### `stats/global` — global rollup (single document)

Maintained by client writes from signed-in students:

| Field | Meaning |
|---|---|
| `users` | Registered accounts (incremented on first profile creation) |
| `sessions` | Completed practice/mock sessions |
| `attemptsTotal`, `correctTotal` | Individual answers submitted |
| `perWeek { "0"…"12": {a, c} }` | Attempts / correct per week |
| `perQuestion { qid: {a, c} }` | Attempts / correct per question |
| `feedback {up, down}` | Global 👍 / 👎 counts (vote changes move the count) |
| `issues` | Total reported issues |

Updates are Firestore `increment()` writes issued when a session is
submitted, a feedback vote is cast/changed, or an issue is reported —
so concurrent students cannot clobber each other's counts.

### `issues/{autoId}` — question reports

`{uid, email, qid, week, number, type, text, at}` — created by the
signed-in reporter; the admin panel lists the latest 50.

## Security rules

`firestore.rules`, in summary:

- `users/{uid}` — read/write **only** by that uid, PLUS the owner-read exception (owner order 2026-10-24): the owner's verified Google identity (`ankitraj2163@gmail.com`, `email_verified == true`) may READ every user doc, so the admin panel's students list works. Writes stay owner-only.
- `stats/*` — read/write by any signed-in user (needed for the
  client-side rollup).
- `issues/*` — create by any signed-in user (must stamp own uid);
  read by any signed-in user; update/delete denied.
- Everything else denied.

**Honest limits.** The admin gate is a client-side convenience lock
(the owner has accepted this design): a determined signed-in student
could read `stats/global` or the issues list directly through the API,
and rollup counters are writable by any signed-in client, so they are
trust-based tallies, not audited figures. Closing this properly means
Cloud Functions (server-side aggregation + admin custom claims) — a
later phase, not this one. Per-student study data is properly locked
to its owner by the rules.

## Migration from the device-local model (pre-Phase 2)

Old email/password accounts were device-local (salted hashes in local
storage) and are **retired** by this switch — they cannot sign in to
Firebase, and no password ever leaves the device. Nobody's progress is
wiped:

- The old local state stays untouched in local storage.
- On a user's **first Firebase sign-in** (either provider), the app
  looks for pre-backend data belonging to that identity: the parked
  local account with the same email, plus any unattached guest
  ("legacy") data on the device.
- If the server document does not exist yet, that data is uploaded as
  the new account's record (`migratedFromLocal: true`). If it does
  exist, the local data is merged in conservatively: server wins;
  per-question attempts keep the record with more attempts; bookmarks,
  notes and quick-revision flags union; sessions merge de-duplicated.
- The migration runs **once per account per device**
  (`cloudMigratedFor` marker) and never deletes the local copy.

## Console setup checklist (one-time, owner account) — DONE 2026-10-24 (project `nptel-exam-practice-hub`, number 1027127051952, Spark; web app "NPTEL Hub Web"; Google + Email/Password enabled; authorised domain `nptel-exam-practice-hub.vercel.app` added; Firestore (default) nam5 PRODUCTION mode; rules published incl. owner-read exception below)

1. Firebase Console → **Add project** (any name, e.g. `nptel-exam-hub`).
2. **Build → Authentication → Sign-in method**: enable **Google** and
   **Email/Password**.
3. **Authentication → Settings → Authorized domains**: confirm
   `localhost`, `<project-id>.firebaseapp.com` **and
   `nptel-exam-practice-hub.vercel.app`** are listed — Google sign-in
   fails with `auth/unauthorized-domain` on any domain missing here.
4. **Build → Firestore Database → Create database** (production mode).
   Paste `firestore.rules` into the Rules tab and Publish (or
   `firebase deploy --only firestore:rules`).
5. **Project settings → General → Your apps → Web (`</>`)**: register
   the app, copy the `firebaseConfig` object into
   `assets/js/firebase-config.js` as `window.FB_CONFIG`.
6. Push the Phase 2 build; verify: two accounts (signup → attempt →
   aggregates move), Google sign-in on the production domain, admin
   panel global numbers.

## What shipped with the switch (2026-10-24 build, `?v=20261024b`)

- **Remember me → Firebase Auth persistence.** Login/signup checkbox ticked = `browserLocalPersistence` (survives restarts); unticked = `browserSessionPersistence` (ends with the session). Set before every sign-in, both providers. The old local-auth remember-me marker split retires with local accounts.
- **Admin panel = full dashboard.** `stats/global` aggregates PLUS a students list (name, email, sessions, attempts + accuracy, weakest weeks ≥3 attempts, last activity), sorted by last activity. Gate-only sessions (no Firebase sign-in) get `studentsDenied` — the panel renders, the list shows the owner-only lock note, nothing fails.
- **Login redesign.** Auth screens rebuilt on the app tokens (light #F2F7FD / primary #2878F9 / navy #14264A, full dark parity): `.gbtn` Google button (official G mark), `.auth-or` divider, `.auth-head` blocks, `.auth-note` ("Secured by Firebase — your progress syncs to your account."), Remember-me checkbox on login AND signup (ticked by default).
- **Copy truth audit.** Zero device-local claims remain (grep-verified): no "this device" / "needs a backend" strings in app.js/index.html; footer credit stays "Built by Thunderdoc"; Source & Limits now states Firebase accounts + Firestore storage; admin "(this device)" labels and backend banner removed.
- **CSS rebase fix (found by diff, 2026-10-24).** The spliced stylesheet predated production pushes and was missing `.rem-row`, `.study-opt .stmain` (the tag-overlap column fix), `.opt > span` wrap and `.foot-brand`. Rebuilt as production stylesheet + appended auth block only (0 lines removed vs production, verified by diff).

## What did not change

- Question bank, answers, Learn/Practice/Revision behaviour, design
  system — untouched.
- Visitor counts still come from Vercel Analytics (linked in the
  admin panel); Firebase counts registered students, not visits.
- The local-only fallback: with `window.FB_CONFIG = null` the app
  boots normally and sign-in buttons report "unavailable" honestly —
  used by the local test mirror, never by production.

## Switch status (2026-10-24)
- Console setup complete (project `nptel-exam-practice-hub`, Google + Email/Password enabled, production domain authorised, rules published).
- Switch build (merged app.js md5 73ab0b2d) lives on branch `preview/phase2-switch` (commit 9753b0e2) behind Vercel Deployment Protection; the `main` switch push is pending the final live proofs (in-browser sync on the preview URL + the owner's Google students-list check). The CHANGELOG Phase-2 entry was corrected from "SHIPPED" to "IN PREVIEW" until that push lands.
- stats/global was reset to clean zeros before the switch window; any preview testing after a reset requires a re-reset immediately before the main push.
