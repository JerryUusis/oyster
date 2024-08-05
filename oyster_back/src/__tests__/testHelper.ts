import {
  createUserWithEmailAndPasword,
  deleteById,
} from "../services/firestore";
import { firestore, auth } from "../services/firebaseAdmin";

// Generate a random integer between a chosen range
const getRandomInt = (min: number, max: number) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.max(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

// Generate 12 character password password from random unicodes
const generatePassword = () => {
  let password = "";
  for (let i = 0; i < 12; i++) {
    // Generate random unicode value between 33 and 126
    const randomCharacter = String.fromCodePoint(getRandomInt(33, 126));
    password += randomCharacter;
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

export { initializeUsers, clearUsers, getNonExistingUid };
