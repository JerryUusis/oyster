import { createUserWithEmailAndPasword } from "../services/firestore";
import { firestore, auth } from "../services/firebaseAdmin";

const initialUsers = [
  {
    username: "Mari Kaasinen",
    email: "mari.kaasinen@gmail.com",
    password: "salasana1234",
  },
  {
    username: "Teppo Särkkä",
    email: "t.sarkka@gmail.com",
    password: "sarkkaniemi",
  },
  {
    username: "Panu Kasurinen",
    email: "panu.kasurinen@gmail.com",
    password: "salasana1234",
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

export { initializeUsers, clearUsers };
