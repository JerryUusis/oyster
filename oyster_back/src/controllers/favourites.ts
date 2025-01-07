import express from "express";
import { addToFavourites } from "../services/firestore";

const favourites = express.Router();

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
    if (error instanceof Error)
      if (error.message.includes("already added in the favourites"))
        return response.status(409).json({ error: error.message });
  }
});

export default favourites;
