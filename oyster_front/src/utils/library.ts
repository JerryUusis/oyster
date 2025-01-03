import { signOut, getAuth } from "firebase/auth";
import { updateUser } from "../services/registerService";
import { UserObject } from "./types";

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

export { signUserOut, updateUserObject };
