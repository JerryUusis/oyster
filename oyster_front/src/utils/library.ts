import { signOut, getAuth } from "firebase/auth";
import { updateUser } from "../services/registerService";
import { CountryObject, UserObject } from "./types";

const signUserOut = async () => {
  const auth = getAuth();
  await signOut(auth);
};

const updateUserObject = async (
  userObject: UserObject,
  keyToUpdate: keyof UserObject,
  newValue: string
) => {
  const newUserObject = { ...userObject, [keyToUpdate]: newValue };
  return await updateUser(newUserObject);
};

// Extract languages and filter duplicates from the Countries state in Redux
const getLanguages = (countryDataArray: CountryObject[]) => {
  const languagesArray: string[] = [];
  countryDataArray.forEach((country) => {
    if (country.languages) {
      for (const language of Object.values(country.languages)) {
        if (!languagesArray.includes(language)) {
          languagesArray.push(language.toString());
        }
      }
    }
  });

  // Sort languages in alphabetical order
  languagesArray.sort((a,b) => a.localeCompare(b));

  return languagesArray;
};

export { signUserOut, updateUserObject, getLanguages };
