import express, { Request } from "express";
import { auth } from "../services/firebaseAdmin";
import { getUserByEmail, getUserById } from "../services/firestore";
import { verifyIdToken } from "../utils/middleware/middleware";
import bcrypt from "bcrypt";
const login = express.Router();

login.post("/", async (request, response) => {
  const { password, email } = request.body;

  if (!email || !password) {
    return response.status(400).json({ error: "missing credentials" });
  }

  // Return user doc from "users" collection if found. Return null if not found.
  const user = await getUserByEmail(email);

  if (!user) {
    return response.status(404).json({ error: "user not found" });
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrect) {
    return response.status(401).json({ error: "invalid username or password" });
  }

  const customToken = await auth.createCustomToken(user.uid);
  response.status(200).json({ customToken });
});

login.post("/verify", verifyIdToken, async (request: Request, response) => {
  try {
    const { decodedIdToken } = request;

    const userData = (await getUserById(
      decodedIdToken.uid
    )) as FirebaseFirestore.DocumentData;

    // Omit password hash
    const user = {
      username: userData.username,
      email: userData.email,
      uid: userData.uid,
      location: userData.location,
      languages: userData.languages,
      theme: userData.theme,
    };

    response.status(200).json({ user });
  } catch (error) {
    response.status(500).send({ error: "unknown error" });
  }
});

export default login;
