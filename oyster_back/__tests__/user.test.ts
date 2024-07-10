import { describe, beforeEach, afterEach, test, expect } from "vitest";
import { createUserWithEmailAndPasword } from "../services/firestore";
import { firestore, auth } from "../services/firebaseAdmin";
import app from "../app";
import supertest from "supertest";
const api = supertest(app);

describe("API tests", () => {
  let userRecord: FirebaseFirestore.DocumentData;
  beforeEach(async () => {
    userRecord = await createUserWithEmailAndPasword(
      "testmail@gmail.com",
      "test1234",
      "testuser"
    );
  });
  afterEach(async () => {
    await firestore.collection("users").doc(userRecord.uid).delete();
    await auth.deleteUser(userRecord.uid);
  });
  describe("GET", () => {
    test("initial length of users is 1", async () => {
        const result = await api.get("/api/user").expect(200);
        console.log(result)
        expect(result.body.length).toBe(1);
    })
  })
});
