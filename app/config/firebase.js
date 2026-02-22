'use client';

import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider, signInWithPopup };
