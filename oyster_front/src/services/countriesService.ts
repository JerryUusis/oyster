import axios from "axios";
import { initializeIDB } from "../utils/indexedDb";

// https://restcountries.com/
const countriesApi = "https://restcountries.com/v3.1/independent?status=true";

let countriesCache: null | object[] = null;

// Fetch countries array from IndexedDB or API
const getCountries = async () => {
  if (countriesCache) {
    console.log("Retrieved data from cache");
    return countriesCache
  }

  try {
    // Initialize IndexedDB
    const db = await initializeIDB();
    // Start a transaction for accessing the object store
    const transaction = db.transaction("countries", "readonly");  // https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/transaction
    // Get access to the object store
    const store = transaction.objectStore("countries"); // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore
    // Attempt to retrieve data from IndexedDB
    const countriesArray = await store.get("all");

    // If data exists in IndexedDB return data from there
    if (countriesArray) {
      console.log("Retrieved data from indexedDB:", countriesArray)
      return countriesArray;
    } else {
      console.log("fetching data from API")
      // If data does not exist in IndexedDB fetch data from API and store it to IndexedDb
      const response = await axios.get(countriesApi);
      if (response.data) {
        const transaction = db.transaction("countries", "readwrite");
        const store = transaction.objectStore("countries");
        await store.put(response.data, "all");

        countriesCache = response.data;
        return response.data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export { getCountries };
