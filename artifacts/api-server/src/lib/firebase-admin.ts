import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function firebaseApp() {
  if (getApps().length) return getApps()[0];

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!serviceAccountJson) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is required.");
  }

  return initializeApp({
    credential: cert(JSON.parse(serviceAccountJson)),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

export function firebaseAuth() {
  return getAuth(firebaseApp());
}

export function firestore() {
  return getFirestore(firebaseApp());
}