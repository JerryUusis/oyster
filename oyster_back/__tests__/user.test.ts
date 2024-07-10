import { initializeUsers, clearUsers } from "./testHelper";
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
  });
});
