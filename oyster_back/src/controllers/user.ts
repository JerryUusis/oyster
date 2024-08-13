import express from "express";
import {
  createUserWithEmailAndPasword,
  getUsers,
  getUserById,
  deleteById,
  updateUserById,
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
    return response.status(400).json({ error: "missing credentials" });
  }

  if (password.length < 6) {
    return response
      .status(400)
      .json({ error: "password must be at least 6 characters long" });
  }

  // Check email pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return response.status(400).json({ error: "invalid email format" });
  }

  // Check if email is already in use
  const users = await getUsers();
  for (const user of users) {
    if (user.email === email) {
      return response.status(400).json({ error: "email already in use" });
    } else if (user.username === username) {
      return response.status(400).json({ error: "username already in use" });
    }
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

user.put("/:id", async (request, response) => {
  // If body is empty object then respond with 400
  if (Object.keys(request.body).length === 0) {
    return response.status(400).json({ error: "malformatted body" });
  }
  const dbResponse = await updateUserById(request.params.id, request.body);
  if (!dbResponse) {
    response.status(404).json({ error: "user not found" });
  }
  response.status(200).json(dbResponse);
});

user.delete("/:id", async (request, response) => {
  const dbResponse = await deleteById(request.params.id);
  if (dbResponse) {
    return response.status(204).end();
  } else {
    return response.status(404).json({ error: "user not found" });
  }
});

export default user;
