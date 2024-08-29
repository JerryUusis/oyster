import { openDB } from "idb";

// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

// Initialize IndexedDB with a specific database name and version
// If the database or object store doesn't exist, it will be created
// The `upgrade` function is called when the database is first created
// https://www.npmjs.com/package/idb#opendb
const dbPromise = openDB("countries-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("countries")) {
      // If it doesn't exist, create a new object store named "countries"
      db.createObjectStore("countries");
    }
  },
});

// Function to initialize and retrieve the IndexedDB instance
const initializeIDB = async () => {
  try {
    // Await the resolution of the dbPromise, which is the database instance
    const db = await dbPromise;
    // Verify that the object store "countries" exists in the database
    if (!db.objectStoreNames.contains("countries")) {
      console.error("Object store countries not found during initialization");
    }
    return db;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { initializeIDB };
