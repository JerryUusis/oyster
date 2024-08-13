import express from "express";
import { auth } from "../services/firebaseAdmin";
import { getUserByEmail } from "../services/firestore";
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

  const userDataFortoken = {
    username: user.username,
    email: user.email,
    uid: user.uid,
  };

  const customToken = await auth.createCustomToken(user.uid);
  response.status(200).json({ ...userDataFortoken, customToken });
});

export default login;
