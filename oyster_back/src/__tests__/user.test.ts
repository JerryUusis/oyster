import {
  initializeUsers,
  clearUsers,
  getNonExistingUid,
  generatePassword,
} from "./testHelper";
import { getUsers } from "../services/firestore";
import app from "../app";
import supertest from "supertest";
import { UserInterface } from "../utils/types";
const api = supertest(app);
const BASE_URL = "/api/user";

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
      const result = await api.get(BASE_URL).expect(200);
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
      const result = await api.get(`${BASE_URL}/${nonExistingUid}`).expect(404);
      expect(result.body.error).toBe("user not found");
    });
  });

  describe("POST", () => {
    test("should increase the length of users collection by 1", async () => {
      const initialUsers = await api.get(BASE_URL);
      const newUser: UserInterface = {
        email: "newuseremail@gmail.com",
        username: "New User",
        password: generatePassword(),
      };
      await api.post(BASE_URL).send(newUser).expect(201);
      const usersAtEnd = await api.get(BASE_URL);
      expect(usersAtEnd.body.length).toBe(initialUsers.body.length + 1);
      expect(
        usersAtEnd.body.find(
          (user: UserInterface) => user.username === newUser.username
        )
      ).not.toBe(undefined);
    });
  });
});
