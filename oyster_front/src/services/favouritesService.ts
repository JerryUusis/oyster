import axios, { isAxiosError } from "axios";
import { HOST } from "../env_config";
const BASE_URL = `http://${HOST()}:3001/api/favourites`;

const addToFavourites = async (uid: string, country: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/${uid}`, { name: country });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data.error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};

const removeFromFavourites = async (
  uid: string,
  country: string,
  idToken: string
) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${uid}`, {
      headers: { Authorization: `Bearer ${idToken}` },
      params: { name: country },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data.error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};

const getFavourites = async (uid: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${uid}`);
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data.error) {
      throw new Error(error.message);
    }
  }
};

export { addToFavourites, removeFromFavourites, getFavourites };
