import { firestore, auth } from "./firebaseAdmin";

// Return all users in the "users" collection
const getUsers = async () => {
  const collectionRef = firestore.collection("users");
  const snapshot = await collectionRef.get();

  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(users.length)
  return users;
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

export { createUserWithEmailAndPasword, getUsers };
