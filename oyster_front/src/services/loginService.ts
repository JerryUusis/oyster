import axios, { isAxiosError } from "axios";
import { HOST } from "../env_config";
const BASE_URL = `http://${HOST()}:3001/api/login`;

const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const response = await axios.post(BASE_URL, { email, password });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data.error) {
      switch (error.response.data.error) {
        case "invalid username or password":
          throw new Error("Wrong password");
        case "user not found":
          throw new Error("User not found");
      }
    }
  }
};

export { loginWithEmailAndPassword };
