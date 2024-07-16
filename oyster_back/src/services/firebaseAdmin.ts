import admin from "firebase-admin";
import { GOOGLE_APPLICATION_CREDENTIALS } from "../utils/config";

admin.initializeApp({
  credential: admin.credential.cert(GOOGLE_APPLICATION_CREDENTIALS as string),
});

// Use Firebase emulators for test and dev environments
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
  process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
}

const firestore = admin.firestore();

const auth = admin.auth();

console.log("Firebase admin initialized");

export { admin, firestore, auth };
