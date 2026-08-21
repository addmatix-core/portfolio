import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseApp = getApps().length
  ? getApp()
  : initializeApp({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: 'addmatix',
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    });

export const firebaseAuth = getAuth(firebaseApp);