import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

let auth: Auth | null = null;

export function getFirebaseAuth(): Auth {
  if (auth) return auth;

  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
  const appId = import.meta.env.VITE_FIREBASE_APP_ID;
  if (!apiKey || !authDomain || !appId) {
    throw new Error(
      'Firebase is not configured for this deployment. Add VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, and VITE_FIREBASE_APP_ID in Vercel, then redeploy.',
    );
  }

  const firebaseApp = getApps().length
    ? getApp()
    : initializeApp({
        apiKey,
        authDomain,
        projectId: 'addmatix',
        appId,
      });

  auth = getAuth(firebaseApp);
  return auth;
}