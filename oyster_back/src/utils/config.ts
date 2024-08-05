import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const HOST = process.env.HOST;
export const FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST;
export const FIREBASE_AUTH_EMULATOR_HOST =
  process.env.FIREBASE_AUTH_EMULATOR_HOST;
export const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
export const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
