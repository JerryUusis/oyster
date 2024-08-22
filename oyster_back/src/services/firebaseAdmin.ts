import admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin/app";
import {
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
} from "../utils/config";

// Create ServiceAccount object from service account file credentials
const serviceAccount: ServiceAccount = {
  privateKey: FIREBASE_PRIVATE_KEY,
  projectId: FIREBASE_PROJECT_ID,
  clientEmail: FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp(serviceAccount);

// Use Firebase emulators for test and dev environments
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development" || process.env.NODE_ENV === "CI") {
  process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
  process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
}

const firestore = admin.firestore();

const auth = admin.auth();

console.log("Firebase admin initialized");
console.log("Node ENV:", process.env.NODE_ENV);

export { admin, firestore, auth };
