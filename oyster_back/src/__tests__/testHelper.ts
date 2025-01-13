import {
  createUserWithEmailAndPasword,
  deleteById,
} from "../services/firestore";
import { firestore, auth } from "../services/firebaseAdmin";
import { getRandomValues } from "crypto";
import { FIREBASE_PROJECT_ID, HOST } from "../utils/config";

// Generate random password with default length of 12
const generatePassword = (length = 12) => {
  let password = "";
  const chars =
    "0123456789abcdefghijklmnopqrstuwxyzåäöABCDEFGHIJKLMNOPQRSTUWXYZÅÄÖ!@#$%^&*()-_=+[]{}|;:',.<>?/";
  const array = new Uint32Array(length); // Create array of 32-bit unsigned integers (integer ranging from 0 to 4,294,967,295)
  getRandomValues(array); // Fill the array with cryptographically secure random 32-bit unsigned integers

  // The remainder of "array[i] % chars.length" will always be shorter than the length of chars
  // Therefore it will always return a character from the chars string and append it to the password
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }
  return password;
};

const initialUsers = [
  {
    username: "Mari Kaasinen",
    email: "mari.kaasinen@gmail.com",
    password: generatePassword(),
  },
  {
    username: "Teppo Särkkä",
    email: "t.sarkka@gmail.com",
    password: generatePassword(),
  },
  {
    username: "Panu Kasurinen",
    email: "panu.kasurinen@gmail.com",
    password: generatePassword(),
  },
];

const initializeUsers = async () => {
  for (const user of initialUsers) {
    await createUserWithEmailAndPasword(
      user.email,
      user.password,
      user.username
    );
  }
};

const clearUsers = async () => {
  // Clears "users" collection in the database
  const collectionRef = firestore.collection("users");
  const snapshot = await collectionRef.get();

  const deleteFirestorePromises = snapshot.docs.map((doc) => doc.ref.delete()); // Returns an array of promises of documents to be deleted
  await Promise.all(deleteFirestorePromises); // Takes an array of promises and returns a single promise when all promises in the array have resolved

  // Clear Firebase Auth users
  const listUsersResult = await auth.listUsers();
  const deleteAuthPromises = listUsersResult.users.map((user) =>
    auth.deleteUser(user.uid)
  );
  await Promise.all(deleteAuthPromises);
};

// Create and return non-exsting uid
const getNonExistingUid = async () => {
  const userToBeDeleted = await createUserWithEmailAndPasword(
    "will.delete@gmail.com",
    "deleteThis",
    "NonExisting"
  );
  const nonExistingUid = userToBeDeleted.uid;
  await deleteById(nonExistingUid);
  return nonExistingUid;
};

// https://firebase.google.com/docs/emulator-suite/connect_firestore#clear_your_database_between_tests
// Can be used to tear down emulators between tests
const clearFirestore = async () => {
  const url = `http://${HOST}:8080/emulator/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    throw new Error("Failed to clear Firestore emulator");
  }
};

export {
  initializeUsers,
  clearUsers,
  getNonExistingUid,
  generatePassword,
  clearFirestore,
};
