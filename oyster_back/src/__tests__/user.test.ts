import { initializeUsers, clearUsers, getNonExistingUid } from "./testHelper";
import { getUsers } from "../services/firestore";
import app from "../app";
import supertest from "supertest";
const api = supertest(app);

describe("API tests", () => {
  beforeEach(async () => {
    await clearUsers();
    await initializeUsers();
  });
  afterEach(async () => {
    await clearUsers();
  });
  describe("GET", () => {
    test("initial length of users is 3", async () => {
      const result = await api.get("/api/user").expect(200);
      expect(result.body.length).toBe(3);
    });
    test("UID as parameter returns single user", async () => {
      const users = await getUsers();
      const user = users[0];
      const result = await api.get(`/api/user/${user.uid}`).expect(200);
      expect(result.body).toEqual(user);
    });
    test("nonexsting uid parameter returns 404", async () => {
      const nonExistingUid = await getNonExistingUid();
      const result = await api.get(`/api/user/${nonExistingUid}`).expect(404);
      expect(result.body.error).toBe("user not found");
    });
  });
});
