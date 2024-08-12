import axios, { isAxiosError } from "axios";
import { NewUserObject } from "../utils/types";
const BASE_URL = "http://localhost:3001/api/user";

const registerNewUser = async (newUserObject: NewUserObject) => {
  try {
    const response = await axios.post(BASE_URL, newUserObject);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 400) {
      throw new Error(error.response.data.error);
    } else if (isAxiosError(error) && error.code === "ERR_NETWORK") {
      throw new Error("Network error. Please try again later.");
    }
  }
};

export { registerNewUser };
