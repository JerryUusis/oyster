import admin from "firebase-admin";
import {
  GOOGLE_APPLICATION_CREDENTIALS,
  FIRESTORE_EMULATOR_HOST,
  FIREBASE_AUTH_EMULATOR_HOST,
} from "../utils/config";

admin.initializeApp({
  credential: admin.credential.cert(GOOGLE_APPLICATION_CREDENTIALS as string),
});

const firestore = admin.firestore();

// Will use the firebase emulators to host the database when doing test runs
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "dev") {
  firestore.settings({
    host: FIRESTORE_EMULATOR_HOST,
    ssl: false,
  });
}

// Configure Authentication emulator if in dev or test mode
if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "test") {
  if (FIREBASE_AUTH_EMULATOR_HOST) {
    process.env.FIREBASE_AUTH_EMULATOR_HOST = FIREBASE_AUTH_EMULATOR_HOST;
    console.log(
      `Firebase Auth emulator host set to ${FIREBASE_AUTH_EMULATOR_HOST}`
    );
  } else {
    console.error("FIREBASE_AUTH_EMULATOR_HOST environment variable not set");
  }
}

const auth = admin.auth();

console.log("Firebase admin initialized");

export { admin, firestore, auth };
