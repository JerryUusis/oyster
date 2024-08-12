import axios from "axios";
import { NewUserObject } from "../utils/types";
const BASE_URL = "http://localhost:3001/api/user";

const registerNewUser = async (newUserObject: NewUserObject) => {
  try {
    const response = await axios.post(BASE_URL, newUserObject);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { registerNewUser };
