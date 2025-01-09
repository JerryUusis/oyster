import { FirebaseAuthError } from "firebase-admin/auth";
import { UserInterface } from "../utils/types";
import { firestore, auth } from "./firebaseAdmin";
import bcrypt from "bcrypt";

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

const getUserByEmail = async (email: string) => {
  const snapshot = await firestore
    .collection("users")
    .where("email", "==", email)
    .get();
  if (snapshot.empty) {
    return null;
  }
  const userDoc = snapshot.docs[0];
  return userDoc.data();
};

const getByUsername = async (username: string) => {
  const snapshot = await firestore
    .collection("users")
    .where("username", "==", username)
    .get();
  if (snapshot.empty) {
    return null;
  }
  const userDoc = snapshot.docs[0];
  return userDoc.data();
};

const deleteById = async (uid: string) => {
  const docRef = firestore.collection("users").doc(uid);
  const doc = await docRef.get();
  // If no data is found for uid return undefined
  if (!doc.data()) {
    return undefined;
  }
  // Check if user exists in Firebase Authentication and delete.
  try {
    const userRecord = await auth.getUser(uid);
    if (userRecord) {
      await auth.deleteUser(uid);
    }
  } catch (error) {
    if (
      error instanceof FirebaseAuthError &&
      error.code === "auth/user-not-found"
    ) {
      console.log("User not found in Firebase Authentication");
    } else {
      throw error;
    }
  }
  // Delete doc from Firestore
  const dbResponse = await docRef.delete();
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

  // Merge the new data to the old object if it's found
  await docRef.set({ ...updatedUserObject }, { merge: true });

  // Omit password hash from the response object
  const updatedDoc = await docRef.get();
  const responseObject = updatedDoc.data() as FirebaseFirestore.DocumentData;
  delete responseObject.passwordHash;

  return responseObject;
};

// Create user with email and password and add user to "users" collection
const createUserWithEmailAndPasword = async (
  email: string,
  password: string,
  username: string
) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Store the user data in Firestore
  const collectionRef = firestore.collection("users");
  const user = {
    email,
    username,
    passwordHash,
    location: "",
    languages: [],
    theme: "",
  };
  const userRecord = await collectionRef.add(user);
  await userRecord.set({ ...user, uid: userRecord.id });

  // Return the record from the "users" collection
  const snapshot = await userRecord.get();
  if (snapshot) {
    return snapshot.data() as FirebaseFirestore.DocumentData;
  } else {
    throw new Error("User not found in Firestore after creation");
  }
};

// Return an array of users favourites. Throw an error if uid does not exist
// Will return an empty array if uid is found but no favourites exist
const getFavourites = async (uid: string) => {
  const userExists = await getUserById(uid);

  if (!userExists) {
    throw new Error(`User with the provided uid:"${uid}" does not exist`);
  }

  const collectionRef = firestore.collection(`users/${uid}/favourites`);
  const favouriteRef = await collectionRef.get();

  const favourites = favouriteRef.docs.map((doc) => doc.get("name"));

  return favourites;
};

// Create a subcollection "favourites" under "users" and add a record {name: <country name>}
const addToFavourites = async (uid: string, country: string) => {
  const userExists = await getUserById(uid);

  if (!userExists) {
    throw new Error(`User with the provided uid:"${uid}" does not exist`);
  }

  const collectionRef = firestore.collection(`users/${uid}/favourites`);

  // Check if country name already exists in the collection
  const existingSnapshot = await collectionRef
    .where("name", "==", country)
    .get();

  // empty returns false if record doesn't exist
  if (!existingSnapshot.empty) {
    throw new Error(`${country} is already added in the favourites`);
  }

  const docRef = await collectionRef.add({ name: country });
  const recordData = await docRef.get();

  return recordData.data();
};

const deleteFromFavourites = async (uid: string, country: string) => {
  const userExists = await getUserById(uid);

  if (!userExists) {
    throw new Error(`User with the provided uid: '${uid}' does not exist`);
  }

  const collectionRef = firestore.collection(`users/${uid}/favourites`);

  // Queries the favourites collection and returns an with the match if it exists
  const querySnapshot = await collectionRef.where("name", "==", country).get();
  // If no match is found return false with querySnapshot.empty
  if (querySnapshot.empty) {
    throw new Error(`Country '${country}' not found in favourites`);
  }

  // Match found with query is array with matching item only
  const docToDelete = querySnapshot.docs[0];
  const deleteResult = await docToDelete.ref.delete();

  return deleteResult;
};

export {
  createUserWithEmailAndPasword,
  getUsers,
  getUserById,
  deleteById,
  updateUserById,
  getUserByEmail,
  getByUsername,
  getFavourites,
  addToFavourites,
  deleteFromFavourites,
};
