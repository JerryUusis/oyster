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
      const response = await api.get(BASE_URL).expect(200);
      expect(response.body.length).toBe(3);
    });
    test("UID as parameter returns single user", async () => {
      const users = await getUsers();
      const user = users[0];
      const response = await api.get(`/api/user/${user.uid}`).expect(200);
      expect(response.body).toEqual(user);
    });
    test("nonexsting uid parameter returns 404", async () => {
      const nonExistingUid = await getNonExistingUid();
      const response = await api
        .get(`${BASE_URL}/${nonExistingUid}`)
        .expect(404);
      expect(response.body.error).toBe("user not found");
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
    test("should return 400 if email is already in use", async () => {
      const newUser: UserInterface = {
        email: "newuseremail@gmail.com",
        username: "New User",
        password: generatePassword(),
      };
      await api.post(BASE_URL).send(newUser).expect(201);
      const secondResponse = await api.post(BASE_URL).send(newUser).expect(400);
      expect(secondResponse.body.error).toBe("email already in use");
    });
    test("should return 400 if email is in malformatted format", async () => {
      const newUser: UserInterface = {
        email: "1asd.com",
        username: "New User",
        password: generatePassword(),
      };
      const response = await api.post(BASE_URL).send(newUser).expect(400);
      expect(response.body.error).toBe("invalid email format");
    });
  });

  describe("DELETE", () => {
    let newUserId: string;
    beforeEach(async () => {
      const userToDelete = {
        email: "newuseremail@gmail.com",
        username: "New User",
        password: generatePassword(),
      };
      const response = await api.post(BASE_URL).send(userToDelete).expect(201);
      newUserId = response.body.uid;
    });
    test("deleting user should reduce the user's collection length by 1", async () => {
      const usersAtStart = await api.get(BASE_URL).expect(200);
      await api.delete(`${BASE_URL}/${newUserId}`).expect(204);
      const usersAtEnd = await await api.get(BASE_URL).expect(200);
      expect(usersAtStart.body.length - 1).toBe(usersAtEnd.body.length);
    });
    test("should return 404 if uid is not found", async () => {
      const nonExistingUid = await getNonExistingUid();
      const response = await api
        .delete(`${BASE_URL}/${nonExistingUid}`)
        .expect(404);
      expect(response.body.error).toBe("user not found");
    });
  });

  describe("PUT", () => {
    test("should return 404 if uid parameter is missing", async () => {
      const response = await api.put(BASE_URL).expect(404);
      expect(response.body.error).toBe("unknown endpoint");
    });
    test("should return 400 if request body is missing", async () => {
      const users = await api.get(BASE_URL);
      const user = users.body[0];
      const response = await api.put(`${BASE_URL}/${user.uid}`).expect(400);
      expect(response.body.error).toBe("malformatted body");
    });
    test("should return 404 with nonexisting id", async () => {
      const nonExistingUid = await getNonExistingUid();
      const response = await api
        .put(`${BASE_URL}/${nonExistingUid}`)
        .send({
          username: "updated user",
          email: "updated@email.com",
        })
        .expect(404);
      expect(response.body.error).toBe("user not found");
    });
    test("should update user doc in database", async () => {
      const users = await api.get(BASE_URL);
      const updatedUser = {
        email: "updated@user.com",
        username: "updated user",
      };
      const user = users.body[0];
      const response = await api
        .put(`${BASE_URL}/${user.uid}`)
        .send(updatedUser)
        .expect(200);
      expect(response.body).toEqual({ ...updatedUser, uid: user.uid });
    });
  });
});
