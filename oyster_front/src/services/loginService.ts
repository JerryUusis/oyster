import axios from "axios";
const BASE_URL = "http://localhost:3001/api/login";

const loginWithToken = async (idToken: string) => {
  try {
    const response = await axios.post(BASE_URL, { idToken });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { loginWithToken };
