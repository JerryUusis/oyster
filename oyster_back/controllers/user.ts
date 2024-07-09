import express from "express";
import { createUserWithEmailAndPasword } from "../services/firestore";
const user = express.Router();

// register a new user
user.post("/", async (request, response) => {
  const { email, password, username } = request.body;
  try {
    const userRecord = await createUserWithEmailAndPasword(
      email,
      password,
      username
    );

    response
      .status(201)
      .json({
        uid: userRecord.uid,
        email: userRecord.email,
        username: userRecord.username,
      });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: error });
  }
});

export default user;
