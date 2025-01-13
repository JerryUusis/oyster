import supertest from "supertest";
import app from "../app";
const api = supertest(app);
const BASE_URL = "/api/favourites";
import { getFavourites, addToFavourites } from "../services/firestore";
import {
  clearFirestore,
  clearUsers,
  generatePassword,
  getNonExistingUid,
} from "./testHelper";
import { HOST } from "../utils/config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  signInWithCustomToken,
} from "firebase/auth";
import { UserInterface } from "../utils/types";
import { admin } from "../services/firebaseAdmin";

describe("favourites router", () => {
  let password: string;
  let idToken: string;
  let uid: string;

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
      languages: [],
      location: "",
      theme: "",
    };

    const { email, username } = newUser;

    // Create a new user
    await api.post("/api/user").send({ email, password, username });
    // Log user in to receive a custom token
    const loginResponse = await api
      .post("/api/login")
      .send({ email, password });
    // Sign in with the custom token
    await signInWithCustomToken(auth, loginResponse.body.customToken);
    // Get ID token and verify it in the backend
    // This gives user permission to favourite data on their account
    idToken = (await auth.currentUser?.getIdToken()) as string;
    await api
      .post("/api/login/verify")
      .set({ Authorization: `Bearer ${idToken}` })
      .expect(200);
    uid = auth.currentUser?.uid as string;
  });

  afterEach(async () => {
    await clearFirestore();
  });

  const testFavourite = { name: "Finland" };

  describe("GET", () => {
    test("initial length of favourites is 0", async () => {
      const favouritesAtStart = await getFavourites(uid);
      expect(favouritesAtStart.length).toBe(0);
    });
    test("should return empty array if no favourites are added", async () => {
      const response = await api.get(`${BASE_URL}/${uid}`).expect(200);
      expect(response.body).toEqual([]);
    });
    test("should return array of favourites when favourites are added", async () => {
      await addToFavourites(uid, testFavourite.name);
      const response = await api.get(`${BASE_URL}/${uid}`).expect(200);
      expect(response.body[0]).toBe(testFavourite.name);
    });
    test("should response with 404 with malformatted uid", async () => {
      const nonExistingUid = await getNonExistingUid();
      const response = await api
        .get(`${BASE_URL}/${nonExistingUid}`)
        .expect(404);
      expect(response.body.error).toBe(
        `User with the provided uid:"${nonExistingUid}" does not exist`
      );
    });
  });

  describe("POST", () => {
    test("should respond with favourite name", async () => {
      const response = await api
        .post(`${BASE_URL}/${uid}`)
        .send(testFavourite)
        .expect(200);
      expect(response.body.name).toBe("Finland");
    });
    test("should increase user's favourites with 1", async () => {
      const favouritesAtStart = await getFavourites(uid);
      await api.post(`${BASE_URL}/${uid}`).send(testFavourite).expect(200);
      const favouritesAtEnd = await getFavourites(uid);

      if (favouritesAtEnd && favouritesAtStart)
        expect(favouritesAtEnd.length).toBe(favouritesAtStart.length + 1);
    });
    test("should respond with 409 and correct error message if trying to add an existing favourite", async () => {
      await api.post(`${BASE_URL}/${uid}`).send(testFavourite).expect(200);
      const secondResponse = await api
        .post(`${BASE_URL}/${uid}`)
        .send(testFavourite)
        .expect(409);

      expect(secondResponse.body.error).toBe(
        `${testFavourite.name} is already added in the favourites`
      );
    });
    test("should respond with 404 with malformatted uid", async () => {
      const nonExistingUid = await getNonExistingUid();
      const response = await api
        .post(`${BASE_URL}/${nonExistingUid}`)
        .send(testFavourite)
        .expect(404);

      expect(response.body.error).toBe(
        `User with the provided uid:"${nonExistingUid}" does not exist`
      );
    });
  });

  describe("DELETE", async () => {
    beforeEach(async () => {
      // Login the newly created user for custom token
      await addToFavourites(uid, testFavourite.name);
    });

    test("should decrease favourites length with 1", async () => {
      const favouritesAtStart = await getFavourites(uid);
      await api
        .delete(`${BASE_URL}/${uid}`)
        .query(testFavourite)
        .set({ Authorization: `Bearer ${idToken}` })
        .expect(204);

      const favouritesAtEnd = await getFavourites(uid);
      expect(favouritesAtEnd.length).toBe(favouritesAtStart.length - 1);
    });
    test("should respond with 404 for nonexisting uid", async () => {
      // Generate non-exiting UID
      const nonExistingUid = await getNonExistingUid();

      // Create a custom token for non-existing UID
      const altCustomToken = await admin
        .auth()
        .createCustomToken(nonExistingUid);
      // Exchange custom token for non-existing UID to get ID-token
      await signInWithCustomToken(auth, altCustomToken);
      const nonExistinIdToken = await auth.currentUser?.getIdToken();

      // Make DELETE request in non-existing endpoint with ID-token
      const response = await api
        .delete(`${BASE_URL}/${nonExistingUid}`)
        .set({ Authorization: `Bearer ${nonExistinIdToken}` })
        .query(testFavourite)
        .expect(404);

      expect(response.body.error).toBe(
        `User with the provided uid: '${nonExistingUid}' does not exist`
      );
    });
    test("should respond with 400 when missing id-token", async () => {
      const response = await api
        .delete(`${BASE_URL}/${uid}`)
        .send(testFavourite)
        .expect(400);

      expect(response.body.error).toBe("missing id token");
    });
    test("should respond with 404 for nonexisting favourite", async () => {
      const response = await api
        .delete(`${BASE_URL}/${uid}`)
        .query({ name: "Mordor" })
        .set({ Authorization: `Bearer ${idToken}` })
        .expect(404);

      expect(response.body.error).toBe(
        `Country 'Mordor' not found in favourites`
      );
    });
    test("should respond with 400 if query is missing", async () => {
      const response = await api
        .delete(`${BASE_URL}/${uid}`)
        .set({ Authorization: `Bearer ${idToken}` })
        .expect(400);

      expect(response.body.error).toBe("missing country name in request query");
    });
  });
});
