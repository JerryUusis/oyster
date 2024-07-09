import admin from "firebase-admin";
import { GOOGLE_APPLICATION_CREDENTIALS } from "../utils/config";

admin.initializeApp({
  credential: admin.credential.cert(GOOGLE_APPLICATION_CREDENTIALS as string),
});

const firestore = admin.firestore();

console.log("Firebase admin initialized");

export { admin, firestore };
