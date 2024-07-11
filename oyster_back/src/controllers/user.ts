import express from "express";
import {
  createUserWithEmailAndPasword,
  getUsers,
  getUserById,
} from "../services/firestore";
const user = express.Router();

// get all users
user.get("/", async (_request, response) => {
  const users = await getUsers();
  response.status(200).json(users);
});

// get user with id
user.get("/:id", async (request, response) => {
  const user = await getUserById(request.params.id);
  if (user) {
    response.status(200).json(user);
  }
  response.status(404).json({ error: "user not found" });
});

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
