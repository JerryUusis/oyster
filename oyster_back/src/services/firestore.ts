import { UserInterface } from "../utils/types";
import { firestore, auth } from "./firebaseAdmin";

// Return all users in the "users" collection
const getUsers = async () => {
  const collectionRef = firestore.collection("users");
  const snapshot = await collectionRef.get();

  const users = snapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  return users;
};

// Return single user as an object from "users" collection with uid
// Return undefined if user is not found
const getUserById = async (uid: string) => {
  const docRef = firestore.collection("users").doc(uid);
  const doc = await docRef.get();
  return doc.data();
};

const deleteById = async (uid: string) => {
  const dbResponse = await firestore.collection("users").doc(uid).delete();
  await auth.deleteUser(uid);
  return dbResponse;
};

// Replace doc in users collection while remaining the uid
// If there is no match with uid then return undefined
const updateUserById = async (
  uid: string,
  updatedUserObject: UserInterface
) => {
  const docRef = firestore.collection("users").doc(uid);
  const doc = await docRef.get();
  if (!doc.data()) {
    return undefined;
  }
  await docRef.set({ ...updatedUserObject, uid: docRef.id });
  const updatedDoc = await docRef.get();
  return updatedDoc.data();
};

// Create user with email and password and add user to "users" collection
const createUserWithEmailAndPasword = async (
  email: string,
  password: string,
  username: string
) => {
  const userRecord = await auth.createUser({ email, password });

  const collectionRef = firestore.collection("users");
  const userRef = collectionRef.doc(userRecord.uid);

  // Store the user data in Firestore
  await userRef.set({
    email,
    username,
    uid: userRecord.uid,
  });
  // Return the record from the "users" collection
  const snapshot = await userRef.get();
  if (snapshot) {
    return snapshot.data() as FirebaseFirestore.DocumentData;
  } else {
    throw new Error("User not found in Firestore after creation");
  }
};

export {
  createUserWithEmailAndPasword,
  getUsers,
  getUserById,
  deleteById,
  updateUserById,
};
