/* ==========================================================================
   Firebase project config — NPTEL Exam Practice Hub backend (Phase 2).

   These values are NOT secrets: they identify the Firebase project to the
   client SDK. Access control lives in firestore.rules (see docs/BACKEND.md).

   REAL VALUES pasted 2026-10-24 from Firebase Console → Project settings →
   General → Your apps → Web app "NPTEL Hub Web" (project created the same
   morning; Google + Email/Password providers enabled; authorised domain
   nptel-exam-practice-hub.vercel.app added; Firestore rules published).

   Do NOT set window.FB_EMULATOR in production: it exists only so the local
   test mirror can point the SDK at the Firebase emulator suite.
   ========================================================================== */
window.FB_CONFIG = {
  apiKey: "AIzaSyDhXmmImMGVwW_chUpzAMFXGsVTzytTbGc",
  authDomain: "nptel-exam-practice-hub.firebaseapp.com",
  projectId: "nptel-exam-practice-hub",
  storageBucket: "nptel-exam-practice-hub.firebasestorage.app",
  messagingSenderId: "1027127051952",
  appId: "1:1027127051952:web:b3cfda50016d802169dd75"
};
