import express from "express";
import { createUserWithEmailAndPasword } from "../services/firestore";
const user = express.Router();

// register a new user
user.post("/", async (request, response) => {
  const { email, password, username } = request.body;
  if (!email || !password || !username) {
    response.status(400).json({ error: "missing credentials" });
  }

  const userRecord = await createUserWithEmailAndPasword(
    email,
    password,
    username
  );

  response.status(201).json({
    uid: userRecord.uid,
    email: userRecord.email,
    username: userRecord.username,
  });
});

export default user;
