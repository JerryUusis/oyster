import { signOut, getAuth } from "firebase/auth";

const signUserOut = async () => {
  const auth = getAuth();
  await signOut(auth);
};

export { signUserOut };
