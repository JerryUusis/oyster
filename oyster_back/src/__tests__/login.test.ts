import { clearUsers, generatePassword } from "./testHelper";
import supertest from "supertest";
import app from "../app";
import { UserInterface } from "../utils/types";
import { createUserWithEmailAndPasword } from "../services/firestore";
import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  connectAuthEmulator,
  getAuth,
} from "firebase/auth";
const api = supertest(app);
const BASE_URL = "/api/login";

// Emulate firebase client application for testing
const firebaseConfig = {
  apiKey: process.env.TEST_FIREBASE_API_KEY,
};

initializeApp(firebaseConfig);
const authClient = getAuth();
connectAuthEmulator(authClient, "http://localhost:9099", {
  disableWarnings: true,
});

describe("login router", () => {
  let idToken: string;
  let user: FirebaseFirestore.DocumentData;

  beforeEach(async () => {
    await clearUsers();
    const password = generatePassword();
    const newUser: UserInterface = {
      username: "test user",
      email: "testuser@gmail.com",
      password,
    };
    const { email, username } = newUser;

    // Create a new user
    user = await createUserWithEmailAndPasword(email, password, username);

    // Sign in with previously created user
    const userCredential = await signInWithEmailAndPassword(
      authClient,
      user.email,
      password
    );
    idToken = await userCredential.user.getIdToken();
  });
  afterEach(async () => {
    await clearUsers();
  });
  afterAll(async () => {
    await clearUsers();
  });
  test("login with idToken in authorization header should return user data and customToken", async () => {
    const response = await api
      .post(BASE_URL)
      .set("Authorization", `Bearer ${idToken}`)
      .expect(200);
    expect(response.body).toEqual({
      ...user,
      customToken: response.body.customToken,
    });
  });
  test("login without idToken in authorization header should return 400", async () => {
    const response = await api.post(BASE_URL).expect(400);
    expect(response.body.error).toBe("ID token is required");
  });
});
