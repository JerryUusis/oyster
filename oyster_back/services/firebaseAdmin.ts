import admin from "firebase-admin";
import { GOOGLE_APPLICATION_CREDENTIALS } from "../utils/config";

admin.initializeApp({
  credential: admin.credential.cert(GOOGLE_APPLICATION_CREDENTIALS as string),
});

console.log("Firebase admin initialized");

export default admin;
