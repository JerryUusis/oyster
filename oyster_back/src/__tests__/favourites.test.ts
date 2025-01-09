import supertest from "supertest";
import app from "../app";
const api = supertest(app);
const BASE_URL = "/api/favourites";
import {
  createUserWithEmailAndPasword,
  getUserByEmail,
  getFavourites,
} from "../services/firestore";
import { clearFirestore, generatePassword } from "./testHelper";
import { DocumentData } from "firebase-admin/firestore";

describe("favourites router", () => {
  let newTestUser: DocumentData | null;

  beforeEach(async () => {
    const testUser = {
      email: "test@user.com",
      username: "Test User",
      password: generatePassword(),
    };

    const { email, password, username } = testUser;

    await createUserWithEmailAndPasword(email, password, username);
    newTestUser = await getUserByEmail("test@user.com");
  });

  afterEach(async () => {
    await clearFirestore();
  });

  describe("POST", () => {
    const testFavourite = { name: "Finland" };
    test("initial length of favourites is 0", async () => {
      if (newTestUser) {
        const favouritesAtStart = await getFavourites(newTestUser.uid);
        expect(favouritesAtStart.length).toBe(0);
      }
    });
    test("should respond with favourite name", async () => {
      if (newTestUser) {
        const response = await api
          .post(`${BASE_URL}/${newTestUser.uid}`)
          .send(testFavourite)
          .expect(200);

        expect(response.body.name).toBe("Finland");
      }
    });
    test("should increase user's favourites with 1", async () => {
      if (newTestUser) {
        const favouritesAtStart = await getFavourites(newTestUser.uid);
        await api
          .post(`${BASE_URL}/${newTestUser.uid}`)
          .send(testFavourite)
          .expect(200);
        const favouritesAtEnd = await getFavourites(newTestUser.uid);

        if (favouritesAtEnd && favouritesAtStart)
          expect(favouritesAtEnd.length).toBe(favouritesAtStart.length + 1);
      }
    });
    test("should respond with 409 and correct error message if trying to add an existing favourite", async () => {
      if (newTestUser) {
        await api
          .post(`${BASE_URL}/${newTestUser.uid}`)
          .send(testFavourite)
          .expect(200);

        const secondResponse = await api
          .post(`${BASE_URL}/${newTestUser.uid}`)
          .send(testFavourite)
          .expect(409);
          
        expect(secondResponse.body.error).toBe(
          `${testFavourite.name} is already added in the favourites`
        );
      }
    });
  });
});
