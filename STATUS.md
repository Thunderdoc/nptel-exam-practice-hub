# Phase 2 — takeover status log (agent: 54e1144b, started 2026-10-23 ~21:58 IST)

## MILESTONE 1 — INVENTORY (done)
- `assets/js/firebase-config.js`: **PLACEHOLDER** — `window.FB_CONFIG = null`. No real
  project values were ever pasted. Consequence: the spliced build, if pushed as-is,
  would boot with sign-in DISABLED. The Firebase project/web-app registration either
  never happened or its config was never collected.
- `docs/BACKEND.md`: complete design doc (schema, rules summary, migration, honest
  limits) — but its "Console setup checklist" is written as FUTURE steps, consistent
  with console setup NOT having been done.
- `firestore.rules`: complete and sane (users/{uid} owner-only; stats signed-in;
  issues create-own/read-signed-in; default deny).
- `firebase.json`: emulator config only (auth 9099 / firestore 8080) + rules pointer.
- Spliced `assets/js/app.js` (234,238 B): contains a full `SECTION JS-3b · CLOUD` —
  dynamic Firebase SDK import from gstatic, Auth (Google popup + email/password),
  Firestore sync (debounced save → users/{uid}), stats/global rollup, issues,
  admin global panel hooks, one-time local→cloud migration. Code-complete on
  inspection; UNVERIFIED against any real project (no config, emulator chain died
  in the previous run).
- `index.html` (phase2): loads `assets/js/firebase-config.js` — but predates the
  production footer redesign, so index.html/style.css/app.js ALL need rebasing onto
  production head 72472c74 before any switch (footer, menu pass-through, Account
  admin removal, bookmark scroll fix, refresh view-restore must be preserved).
- CHANGELOG.md already contains a Phase 2 entry written as if shipped — it is NOT
  shipped; will correct/keep only when the switch actually happens.

## MILESTONE 1b — CONSOLE TRUTH (from every artifact reachable here)
- `~/.config/configstore/firebase-tools.json` is **2 bytes (`{}`)** — the Firebase
  CLI was never logged in on this machine. No `.firebaserc` anywhere. A grep of the
  whole phase2 tree finds NO real project ID, NO apiKey, NO firebaseapp/appspot
  domain — only the placeholder shape in the config comments.
- Conclusion: **there is no evidence any Firebase project was ever created or
  configured**; the crashed run died in local build/emulator work before (or
  without ever) doing the console setup. Whether a project exists inside the
  owner's Google account (created in a browser and abandoned before config
  capture) can ONLY be answered in the live console — handed to parent as an
  exact browser checklist in the Milestone 1 report.
- BLOCKER for all downstream steps: no project ID / no web-app config → nothing
  to verify against, nothing to paste into firebase-config.js. Console state is
  the next dependency; rebase onto 72472c74 and E2E come after it.

## OWNER DECISION (2026-10-24 ~08:36 IST, via parent) — ADMIN SCOPE EXPANDED
The Phase-2 admin panel must be the FULL dashboard: stats/global aggregates PLUS a students list with per-student progress (name/email, sessions, attempts + accuracy, weak weeks, last activity). Rules must therefore allow the owner's admin identity (owner email) to READ users/* while students remain owner-only for their own documents. E2E must prove: student A cannot read student B; the admin identity can. Parent will also carry this in the continuation brief.

## CONSOLE SETUP COMPLETE (2026-10-24 ~08:52 IST, browser session, owner present)
- Project CREATED: nptel-exam-practice-hub (project number 1027127051952, Spark plan, Analytics disabled). Account had 11 pre-existing projects, none for this app.
- Web app "NPTEL Hub Web" registered; real firebaseConfig PASTED into assets/js/firebase-config.js by the parent (FB_CONFIG is now a live object).
- Auth: Google ENABLED, Email/Password ENABLED (email-link off). Support email = owner email.
- Authorised domains: defaults + nptel-exam-practice-hub.vercel.app added.
- Firestore: (default) DB, Standard, nam5, PRODUCTION mode; rules PUBLISHED = current firestore.rules incl. the owner-order admin read exception (rules history 2026-10-24 08:52 IST).
- Sign-in required Google selfie identity verification; the owner completed it in person. Nothing outstanding.
- REMAINING (post-exam): rebase splice onto production head f7c7190b (preserve remember-me, tag fix, refresh-restore, menu, bookmark fixes), build the students-list admin section (rules already permit owner read), remember-me semantics → Firebase Auth persistence (LOCAL/SESSION), E2E on the real project (2 accounts; A cannot read B; owner identity can), ONE switch push.


## SWITCH BUILD — REBASE DONE, E2E (FAST ROUTE) DONE 2026-10-24 (parent steer: speed, zero-mistake bar kept)
- **Rebase base:** production head c3a89be2 (sync record 21 entries). Merged app.js md5 73ab0b2d…; bank byte-identical to production (977482f2…); index tokens ?v=20261024b (css + firebase-config + app.js).
- **Blocker found + routed around:** the sandbox browser cannot reach Firebase directly (egress-proxy MITM cert + Firestore Listen streaming). Full in-browser E2E was eating hours, so per parent steer the real-project E2E switched to direct Firebase REST from Node (no browser proxy needed); the browser probe covers UI flows only on the local mirror.
- **REST E2E (real project, throwaway accounts, cleaned up): 19 PASS / 1 expected-FAIL.** Signup A+B; A writes users/{uid} (app shape) 200; A reads own doc (subject, sessions, attempts, feedback up, bookmark) ✓; B read A → 403; B write A → 403; anon read A → 403; B own path → 404 (not 403); stats/global signed-in write + read-back (sessions +1, attempts +2, correct +2, perWeek/perQuestion) ✓ then RESTORED to pre-test values (sessions/attempts/correct back to 0; users=1 predates this run, from an earlier browser signup rollup); issue create (uid-stamped) 200; B update issue → 403; signed-in issue read 200. The 1 FAIL was the cleanup expectation itself: issue DELETE → 403 because the published rules forbid delete for everyone — correct behaviour, not a defect; one probe issue doc therefore remains in the collection by rules design. Both throwaway accounts deleted.
- **UI probe (local mirror, 390 + 320 + dark): 26 PASS / 2 FAIL, both root-caused to probe origin, not the app.** Login redesign (auth-head/or/note, Google buttons, Remember-me incl. suRem ticked), password-mismatch validation, seeded home, footer (Built by Thunderdoc + Source & Limits + Admin), Source & Limits (no device claims), Learn W8, admin wrong-password rejection, no JS errors, no overflow — all PASS. The 2 FAILs (admin-gate accept, both widths) were the probe origin `http://app.local` not being a secure context, so `crypto.subtle` was undefined and `hashPw` fell back to a hash that can never match — proven by re-running the gate on secure `http://localhost`: wrong pw rejected with the exact message, correct pw (`admin` + verified SHA-256 `nptel-admin-2026::Thunderdoc#130`) opens the Admin Panel. Production (https) is unaffected — the exam-morning smoke check passed this gate live.
- **Tag-overlap, geometrically proven on the rebuilt CSS:** Learn W8 Q7 (biomagnification) — option-text bottom → tag top gap 7px, no overlap, at BOTH 390 and 320; foot-brand display flex; rem-row display flex.
- **NOT DONE — push blocked on purpose:** the single switch push has NOT been made. Remaining before push (no checks trimmed): (a) live-browser week-test sync + remember-me persistence against real Firebase (REST proves endpoints/rules; an earlier proxied browser run proved signup→subject→home, but the full session-sync loop in-browser is unproven in this run); (b) Google sign-in popup beyond the chooser launch (full Google credential sign-in impossible with throwaway accounts — stated limit); (c) owner-read of users/* by the real owner identity (rules text verified; only the owner's own Google sign-in can prove it live). Push only after those, with the owner's approval card.

## PREVIEW DEPLOYMENT + GAP-CLOSING RUN (subagent, 2026-10-24)
- **Preview branch:** `preview/phase2-switch` created from main head c3a89be2 (only `main` existed; branch confirmed absent first). Commit `9753b0e2` pushed 4 files only: index.html, assets/js/app.js, assets/css/style.css, assets/js/firebase-config.js (vercel.json + data/questions.json byte-identical to production, not re-pushed). Branch content verified via GitHub file reads AND raw.githubusercontent fetch: branch app.js md5 = 73ab0b2d (== inherited build), firebase-config.js contains the real project values. Sync record written: ~/workspace/nptel-hub/phase2-work.muse-github-snapshot-sync.json.
- **Preview URL:** https://nptel-exam-practice-hub-git-preview-phase2-switch-thunderdoc.vercel.app — answers HTTP 302 → https://vercel.com/sso-api (Vercel Deployment Protection). The deployment EXISTS (Vercel dpl id in the SSO page) but is NOT publicly reachable: an unauthenticated browser gets the SSO login, not the app. Consequence for Gap 1: a live-browser E2E on this URL needs (a) a Vercel-signed-in browser session, (b) the project's protection-bypass secret (?x-vercel-protection-bypass), or (c) deployment protection disabled for previews in project settings. A subagent cannot run the live-browser route; this is handed to the parent with those exact options.
- **GAP 1 — NOT closed by this agent (stated plainly):** no live-browser week-test sync + remember-me persistence proof exists yet. Strongest proof available here: branch bytes md5-identical to the UI/REST-verified build + the prior run's REST E2E (endpoints/rules) + deployment existence. Sandbox headless was NOT attempted as a substitute because it would hit the same SSO wall and the known sandbox Firebase-egress block; claiming it would be dishonest.
- **GAP 2 — code-verified, credential proof reserved:** googleBtnHTML renders the official Google "G" SVG button; sign-in uses `signInWithPopup` + `GoogleAuthProvider` (app.js ~2598); persistence is set from the Remember-me checkbox (LOCAL ticked / SESSION unticked, ~2582). Console authorised domains already include the PRODUCTION domain only — the preview domain is NOT listed, so a Google popup on the preview URL would fail with auth/unauthorized-domain. The chooser-launch + credential proof therefore needs either the preview domain added in console first, or must run on the production domain after the switch. Full credential proof is the owner's (Gap 3).
- **GAP 3 — owner task prepared (see parent report):** precise steps incl. step 0 (add the preview domain to authorised domains in console, or run on production post-switch). Admin behaviour verified from code: (i) owner-email Firebase account (ankitraj2163@gmail.com, verified) → gate bypass via isOwner(), full panel incl. students list; (ii) gate-only session WITH a non-owner Firebase sign-in → stats + issues load (signed-in reads allowed), users/* read denied → studentsDenied → panel shows everything EXCEPT the students list, which shows the "locked to the owner account" message; (iii) gate-only with NO Firebase sign-in at all → loadAdminCloud fails (signed-out reads denied) → panel shows zeroed stats, empty issues, and students stuck on "Loading…" — the panel is only meaningful with a Firebase sign-in.
- **CLEANLINESS (verified by read-back):** stats/global reset to clean zeros via a signed-in REST write (before: users=1 from an earlier browser signup rollup, rest already 0; after: users 0, sessions 0, attemptsTotal 0, correctTotal 0, perWeek {}, perQuestion {}, feedback 0/0, issues 0). The reset account was deleted (200). Caveats: (1) ONE probe issue doc from the previous run remains in the issues collection — the published rules forbid delete for everyone via API, so it can only be removed from the Firebase console by the owner (optional step in the owner task; until then it appears in the admin issues list). (2) Any further preview testing that increments stats REQUIRES a re-reset immediately before the main push. (3) No test accounts created by this run remain; earlier throwaways were deleted per the previous report (the Auth user list is not independently verifiable from here without Admin SDK).
- **NO MAIN PUSH MADE.** The switch push is held under the owner's zero-mistake bar pending: (A) the live-browser E2E on the preview URL (parent delegation, SSO caveat above), and (B) the owner's Google sign-in students-list check (Gap 3). When both are green, the main push is: the same 4 files + updated CHANGELOG.md/STATUS.md/BACKEND.md from phase2-work, ?v= token already 20261024b in index, sync record for main appended, production md5 + post-push fetch checks.


## Welcome lower-section redesign (owner order 2026-10-24 ~12:56 IST, preview branch only)

- BEFORE (probe 390x844): meta line plain small text; meta bottom y709 → footer top y863 = 154px dead gap (94px main padding-bottom for a bottom nav the welcome screen does not show + 56px footer margin-top); footer bottom 1055 (211px scroll); footer below the fold on load.
- AFTER (app.js welcomeHTML + style.css appended block, scoped `body:has(main .hero)` — .hero exists ONLY on welcome, so no other view touched): meta = subject chip (navy on blue tint, nowrap) + stats strip (Weeks 0–12 · 130 questions, nowrap, blue dot separator); note kept word-for-word, muted + centred + capped 320px; footer = same markup, centred composition, hairline divider kept, margin-top 0, padding-bottom 22px + safe-area (no fake bottom-nav clearance); page is a flex column so the footer pins to the viewport bottom.
- VERIFIED (local mirror, 0 console errors, 0 horizontal overflow everywhere; headline + Google + Email buttons untouched; note text exact; footer links Source & Limits/Admin + "Built by Thunderdoc" intact): 390x844 — meta→footer gap 154px → 8px, footer top on screen (751 < 844), page 877 (33px overshoot: content natural height, not a gap); 390x915 — EXACT fit, scroll == viewport, zero scroll; 320x720 — chip + stats both single-line, no wrap splits, footer top on screen; 768x1024 — EXACT fit, zero scroll; 390 dark — identical geometry, chip readable (dark blue tint, light text). Screenshots: ~/workspace/nptel-hub/welcome-redesign/ (light 390, dark 390, 320, BEFORE 390).
- PUSH: new commit on preview/phase2-switch only (index.html token 20261024b → 20261024c per standing rule + app.js + style.css + CHANGELOG.md + STATUS.md). Main switch stays HELD pending owner approval of this look + his Google sign-in/admin check on preview.


## Google sign-in phone fix + welcome meta removal (owner orders 2026-10-24 ~13:02–13:06 IST, preview branch only)

- OWNER REPORT: on his phone, after the preview domain was authorised, tapping "Continue with Google" + confirming on Google's side landed back on the SAME welcome screen; the Firebase process also felt very slow. Parent diagnosis (code-verified): googleSignIn() first called authUnavailable() — while CLOUD was still "loading" (gstatic SDK import + Firestore persistent-cache init, slow on mobile networks) the tap did NOTHING except a "Connecting…" toast. Popup round-trip on phones is the fragile part (opener evicted/stalled → back on welcome with no state). The onAuthStateChanged → onFbUser → render path itself is correct, so the fix targets the tap/round-trip layer only.
- FIX (app.js only; .btn:disabled styling already existed, no CSS addition needed):
  - AUTH_BUSY flag + refreshAuthButtons(): updates auth buttons IN PLACE (never via render(), so typed email/password is never wiped). Render-time HTML derives the same states (googleBtnHTML, welcome Email button, login/signup submits carry data-lbl + auth-btn class).
  - While CLOUD="loading": Google + Email buttons DISABLED showing "Connecting…". While any sign-in is in flight (Google, email login, email signup): tapped button(s) DISABLED showing "Signing in…" (AUTH_BUSY guards + finally-restore in all three handlers; Enter-key resubmits blocked by the guard).
  - Phones (matchMedia max-width 640px): Google uses signInWithRedirect; desktop/tablet keeps signInWithPopup. getRedirectResult called once at boot in fbInit; redirect errors surface via fbErrText toast ("Google sign-in was interrupted — try again" mapping added). Session restore after redirect still runs through the existing onAuthStateChanged listener.
  - UNCHANGED (verified by grep): persistence mapping (ticked=LOCAL, unticked=SESSION), owner-email logic, migration, questions, Firebase config, firestore.rules.
- META REMOVAL (owner refinement, overrides the "do not touch redesign HTML/CSS" limit narrowly for this block): the entire wel-meta block is GONE from welcomeHTML — subject chip + stats strip markup deleted, .wel-meta/.wel-subj/.wel-stats/.wel-stats span/i + dark .wel-subj CSS deleted (only explanatory comments remain). Welcome shows NO subject name, NO week range, NO question count. KEPT exactly: headline, Google button, Email button, "One account, every device — your progress saves and syncs automatically." (word-for-word), footer/credit block as redesigned (brand, "Built by Thunderdoc", Source & Limits · Admin, divider, pinned bottom). Layout absorbs the removal: .hero space-evenly distribution, no new void.
- VERIFIED (local mirror, deterministic Firebase SDK STUB via CDP interception — real Google credentials cannot be completed by a probe; final credential proof is the owner's phone test): 19/19 PASS — loading buttons disabled "Connecting…" (390); ready restores original labels; in-flight Google tap disabled "Signing in…" + stub recorded REDIRECT (not popup) at 390; reload restores; boot redirect error toasts the exact message; in-flight email submit disabled "Signing in…" → failure "Incorrect email or password" → button restores "Log In"; tablet 768 uses POPUP + failure toast + restore; meta absent at 390/320/dark; welcome layout note→footer gap 17px, footer bottom == viewport 844, scroll == viewport (exact fit), 0 overflow-x everywhere; 0 console errors everywhere. One initial FAIL was a probe artifact (raw footer textContent has a newline in "Built by\nThunderdoc"; whitespace-normalised check passes) — not an app defect. Screenshot post-removal: ~/workspace/nptel-hub/welcome-redesign/welcome-no-meta-390.png (footer bottom 844, subj/stats null, note exact).
- PUSH: next commit(s) to preview/phase2-switch ONLY (index token 20261024c → 20261024d per standing rule). Main switch STILL HELD pending owner approval of this look + his Google sign-in/admin check on preview. NOTE: the login-form loading-state derivation is code-symmetric with the verified welcome derivation (logged-out boot always lands on welcome, so the login form's loading state is unreachable at boot and could not be live-probed — stated honestly, not claimed).


## MAIN SWITCH — SHIPPED 2026-10-24 (owner order, preview test passed)
- Owner confirmed his preview test PASSED (new login look + Google sign-in + admin students-list check) and ordered "push karo".
- Pre-push checks: main head still c3a89be2; phase2-work app files byte-identical to preview head 53c989d6 (app.js 437f121d, css 3ba3f7a0, index 6c5753c0, tokens ?v=20261024d); CHANGELOG Phase-2 entry flipped IN PREVIEW → SHIPPED in the switch commit.
- Cleanliness (REST, read-back verified): stats/global = users 1 (the owner's own real account — honest, not zeroed), sessions 0, attemptsTotal 0, correctTotal 0, perWeek {}, perQuestion {}, feedback 0/0, issues 0. Throwaway reset account deleted. One probe issue doc remains in issues (rules forbid API delete — owner's optional console delete).
- Switch commit pushes to main: index.html, assets/js/app.js, assets/css/style.css, assets/js/firebase-config.js, CHANGELOG.md, docs/BACKEND.md, STATUS.md. data/questions.json + vercel.json byte-identical to production, not re-pushed.


## README + GITHUB HYGIENE PHASE (2026-10-24, after the switch)

- README rewritten against the shipped Firebase build (cloud accounts, 4 tabs,
  5 practice modes, Learn study questions, Revision, Readiness, global admin +
  students list). 9 screenshots added under `docs/images/`, rendered from the
  shipped build's exact main bytes at 390px (local mirror + stubbed Firebase
  SDK, since the sandbox cannot reach Google): welcome (clean, no meta),
  Home, Week Test session (real W1 Q1), results (demo attempt 4/10), Learn
  W1 (real study cards), Revision bookmarks, Account, admin overview,
  admin students list. Inner screens use a demo account — their numbers are
  illustrative, captioned as such; no real student personal data in any shot.
  No live account was created, so live stats were never touched and no
  cleanup was needed (live stats remain users=1 owner, rest 0, plus the one
  pre-existing probe issue doc).
- Docs consistency: ARCHITECTURE rewritten for Firebase (auth, storage, nav,
  Learn, admin); BACKEND corrected (phone Google = redirect, Remember-me =
  Auth persistence, rules published in console, not committed);
  VERIFICATION notes the gaps section is superseded by portal recovery;
  CHANGELOG corrects the old claim that firestore.rules/firebase.json were
  committed (they were not) and adds this phase's entry.
- Hygiene audit: LICENSE verified full MIT, Copyright (c) 2026 Thunderdoc,
  no placeholders, plus the question-content redistribution note — unchanged.
  .gitignore sane for a static site — unchanged. No git tags or releases
  exist (ls-remote proof); no semver headings or in-app version string.
  Recommendation (NOT done — needs owner go-ahead): tag v2.0.0 for the
  Firebase switch. Historical CHANGELOG entries mentioning lessons/Search/
  device-local accounts are dated history of v2 and were deliberately left
  untouched.
- Secret-scanning alert (Firebase web apiKey in firebase-config.js): the
  GitHub connector exposes no alert-dismissal tool, so dismissal was NOT
  done here — exact URL + steps handed to the parent for a browser task.
  The key is a public project identifier by Firebase's design, not a secret.
