import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const HOST = process.env.HOST;
export const GOOGLE_APPLICATION_CREDENTIALS =
  process.env.GOOGLE_APPLICATION_CREDENTIALS;
export const FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST;
export const FIREBASE_AUTH_EMULATOR_HOST =
  process.env.FIREBASE_AUTH_EMULATOR_HOST;
