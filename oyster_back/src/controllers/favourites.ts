import express from "express";
import { getFavourites, addToFavourites } from "../services/firestore";

const favourites = express.Router();

// Get favourites
favourites.get("/:id", async (request, response) => {
  try {
    const dbResponse = await getFavourites(request.params.id);
    response.status(200).json(dbResponse);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes(`uid:"${request.params.id}" does not exist`)
    ) {
      return response.status(404).json({ error: error.message });
    } else {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      }
    }
  }
});

// Add a new favourite in users/<uid>/favourites
favourites.post("/:id", async (request, response) => {
  const { name } = request.body;
  try {
    const dbResponse = await addToFavourites(request.params.id, name);

    if (dbResponse) {
      response.status(200).json(dbResponse);
    } else {
      response.status(400).json({ error: "unknown error" });
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("already added in the favourites"))
        return response.status(409).json({ error: error.message });
    }
  }
});

export default favourites;
