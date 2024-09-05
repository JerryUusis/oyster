import { clearUsers, generatePassword } from "./testHelper";
import supertest from "supertest";
import app from "../app";
import { UserInterface } from "../utils/types";
import { createUserWithEmailAndPasword } from "../services/firestore";
const api = supertest(app);
const BASE_URL = "/api/login";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  signInWithCustomToken,
} from "firebase/auth";
import { HOST } from "../utils/config";

describe("login router", () => {
  let user: FirebaseFirestore.DocumentData;
  let password: string;

  // Initialize emulated Firebase client side Authentication SDK
  const firebaseConfig = {
    apiKey: "mock api key",
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  connectAuthEmulator(auth, `http://${HOST}:9099`);

  beforeEach(async () => {
    await clearUsers();
    password = generatePassword();
    const newUser: UserInterface = {
      username: "test user",
      email: "testuser@gmail.com",
      password,
    };
    const { email, username } = newUser;

    // Create a new user
    user = await createUserWithEmailAndPasword(email, password, username);
  });
  afterEach(async () => {
    await clearUsers();
  });

  afterAll(async () => {
    await clearUsers();
  });
  describe("/login", () => {
    describe("missing or wrong credentials", () => {
      test("missing email", async () => {
        const response = await api
          .post(BASE_URL)
          .send({ password: user.password })
          .expect(400);
        expect(response.body.error).toBe("missing credentials");
      });
      test("missing password", async () => {
        const response = await api
          .post(BASE_URL)
          .send({ email: user.email })
          .expect(400);
        expect(response.body.error).toBe("missing credentials");
      });
      test("non-existing email", async () => {
        const response = await api
          .post(BASE_URL)
          .send({
            password: generatePassword(),
            email: "non-existing@gmail.com",
          })
          .expect(404);
        expect(response.body.error).toBe("user not found");
      });
      test("wrong password", async () => {
        const response = await api
          .post(BASE_URL)
          .send({ password: generatePassword(), email: user.email })
          .expect(401);
        expect(response.body.error).toBe("invalid username or password");
      });
    });
    describe("correct credentials", () => {
      test("should contain customToken", async () => {
        const response = await api
          .post(BASE_URL)
          .send({ password: password, email: user.email })
          .expect(200);
        expect(response.body.customToken).toBeTruthy();
      });
    });
  });

  describe("login/verify", () => {
    test("missing id token", async () => {
      const response = await api.post(`${BASE_URL}/verify`).expect(400);
      expect(response.body.error).toBe("missing id token");
    });
    test("malformed id token", async () => {
      const response = await api
        .post(`${BASE_URL}/verify`)
        .send({ idToken: "bad token" })
        .expect(401);
      expect(response.body.error).toBe("invalid id token");
    });
    test("should return user data with valid id token", async () => {
      const loginResponse = await api
        .post(BASE_URL)
        .send({ password: password, email: user.email })
        .expect(200);

      // Use Authentication client side SDK to generate ID token
      await signInWithCustomToken(auth, loginResponse.body.customToken);

      const idToken = await auth.currentUser?.getIdToken();
      const verifyResponse = await api
        .post(`${BASE_URL}/verify`)
        .send({ idToken })
        .expect(200);
      expect(verifyResponse.body.user).toEqual({
        username: user.username,
        email: user.email,
        uid: user.uid,
      });
    });
  });
});
