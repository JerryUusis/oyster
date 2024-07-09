import express from "express";
import { admin, firestore } from "../services/firebaseAdmin";
const user = express.Router();

// register a new user
user.post("/", async (request, response) => {
  const { email, password, username } = request.body;
  try {
    const userRecord = await admin.auth().createUser({ email, password });

    // Store the user data in Firestore
    await firestore.collection("users").doc(userRecord.uid).set({
      email: userRecord.email,
      username: username,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    // Mint a custom token for the user
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    response.status(201).send({ uid: userRecord.uid, token: customToken });
  } catch (error) {
    console.error("Error creating custom token:", error);
    response.status(500).send("Error creating custom token");
  }
});

export default user;
