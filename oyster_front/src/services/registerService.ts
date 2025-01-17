import axios, { isAxiosError } from "axios";
import { NewUserObject, UserObject } from "../utils/types";
import { HOST } from "../env_config";
const BASE_URL = `http://${HOST()}:3001/api/user`;

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

const updateUser = async (newUserObject: UserObject) => {
  try {
    const response = await axios.put(`${BASE_URL}/${newUserObject.uid}`, newUserObject);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 400) {
      throw new Error(error.response.data.error);
    } else if (isAxiosError(error) && error.code === "ERR_NETWORK") {
      throw new Error("Network error. Please try again later.");
    }
  }
};

export { registerNewUser, updateUser };
