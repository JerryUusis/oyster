import express from "express";
import { auth } from "../services/firebaseAdmin";
import { getUserById } from "../services/firestore";
const login = express.Router();

login.post("/", async (request, response) => {
  const { idToken } = request.body;

  if (!idToken) {
    return response.status(400).json({ error: "ID token is required" });
  }

  // Verify token
  const decodedToken = await auth.verifyIdToken(idToken); // https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_the_firebase_admin_sdk
  const uid = decodedToken.uid;
  // Create a custom token
  const customToken = await auth.createCustomToken(uid);

  const user = await getUserById(uid);

  // Send user data and custom JWT back to the client
  response.status(200).json({ ...user, customToken });
});

export default login;
