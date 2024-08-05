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

  afterAll(async () => {
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
    test("should return 400 if email is missing", async () => {
      const newUser = {
        username: "New User",
        password: generatePassword(),
      };
      const response = await api.post(BASE_URL).send(newUser).expect(400);
      expect(response.body.error).toBe("missing credentials");
    });
    test("should return 400 if username is missing", async () => {
      const newUser = {
        email: "newuseremail@gmail.com",
        password: generatePassword(),
      };
      const response = await api.post(BASE_URL).send(newUser).expect(400);
      expect(response.body.error).toBe("missing credentials");
    });
    test("should return 400 if password is missing", async () => {
      const newUser = {
        email: "newuseremail@gmail.com",
        username: "New User",
      };
      const response = await api.post(BASE_URL).send(newUser).expect(400);
      expect(response.body.error).toBe("missing credentials");
    });
    test("should return 400 if password is shorter than 6 characters", async () => {
      const newUser: UserInterface = {
        email: "newuseremail@gmail.com",
        username: "New User",
        password: generatePassword(5),
      };
      const response = await api.post(BASE_URL).send(newUser).expect(400);
      expect(response.body.error).toBe("invalid password");
    });
  });
});
