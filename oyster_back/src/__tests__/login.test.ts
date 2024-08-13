import { clearUsers, generatePassword } from "./testHelper";
import supertest from "supertest";
import app from "../app";
import { UserInterface } from "../utils/types";
import { createUserWithEmailAndPasword } from "../services/firestore";
const api = supertest(app);
const BASE_URL = "/api/login";

describe("login router", () => {
  let user: FirebaseFirestore.DocumentData;
  let password: string;

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
        .send({ password: generatePassword(), email: "non-existing@gmail.com" })
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
    test("should return uid", async () => {
      const response = await api
        .post(BASE_URL)
        .send({ password: password, email: user.email })
        .expect(200);
      expect(response.body.uid).toBe(user.uid);
    });
    test("should return email", async () => {
      const response = await api
        .post(BASE_URL)
        .send({ password: password, email: user.email })
        .expect(200);
      expect(response.body.email).toBe(user.email);
    });
    test("should return username", async () => {
      const response = await api
        .post(BASE_URL)
        .send({ password: password, email: user.email })
        .expect(200);
      expect(response.body.username).toBe(user.username);
    });
    test("should contain customToken", async () => {
      const response = await api
        .post(BASE_URL)
        .send({ password: password, email: user.email })
        .expect(200);
      expect(response.body.customToken).toBeTruthy();
    });
  });
});
