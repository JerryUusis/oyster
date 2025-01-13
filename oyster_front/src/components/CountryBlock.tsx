import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { useOysterPalette } from "../utils/theme/theme";
import { CountryObject } from "../utils/types";
import { auth } from "../services/firebaseAuthentication";
import { setFavourites } from "../store/favouritesSlice";
import {
  addToFavourites,
  removeFromFavourites,
} from "../services/favouritesService";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setAlert } from "../store/alertSlice";

interface CountryBlockProps {
  country: CountryObject;
}

const CountryBlock = ({ country }: CountryBlockProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const oysterPalette = useOysterPalette();
  const dispatch = useAppDispatch();

  const favourites = useAppSelector((state) => state.favourites);

  // TODO: Have this for basis for optimizing image load times using caching
  useEffect(() => {
    if (imageRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

  const uid = auth.currentUser?.uid as string;

  const handleAddToFavourites = async (uid: string, country: string) => {
    try {
      const response = await addToFavourites(uid, country);
      const newFavourites = [...favourites, response.name];
      dispatch(setFavourites(newFavourites));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setAlert({ severity: "error", message: error.message }));
      } else {
        dispatch(setAlert("Unknown error"));
      }
    }
  };

  const handleRemoveFromFavourites = async (uid: string, country: string) => {
    try {
      const idToken = (await auth.currentUser?.getIdToken()) as string;
      await removeFromFavourites(uid, country, idToken);
      const newFavourites = favourites.filter(
        (favouriteName) => favouriteName !== country
      );
      dispatch(setFavourites(newFavourites));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setAlert({ severity: "error", message: error.message }));
      } else {
        dispatch(setAlert("Unknown error"));
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "90%",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ height: "80px", width: "80px" }}>
        {!imageLoaded && (
          <Skeleton variant="rectangular" height="80px" width="80px" />
        )}
        <img
          src={country.flags.svg}
          height="80px"
          width="80px"
          alt={`Flag of ${country.name.common}`}
          style={{
            objectFit: "cover",
            visibility: imageLoaded ? "visible" : "hidden",
          }}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          ref={imageRef}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "358px",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: oysterPalette.lightGray,
        }}
      >
        <Typography pl="0.75rem" variant="h3" maxWidth="175px" noWrap>
          {country.name.common}
        </Typography>
        <Box sx={{ display: "flex" }}>
          {favourites.includes(country.name.common) ? (
            <IconButton
              onClick={() =>
                handleRemoveFromFavourites(uid, country.name.common)
              }
            >
              <FavoriteIcon sx={{ color: oysterPalette.darkBrown }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => handleAddToFavourites(uid, country.name.common)}
            >
              <FavoriteBorderIcon sx={{ color: oysterPalette.darkBrown }} />
            </IconButton>
          )}
          <IconButton>
            <CheckCircleOutlineIcon sx={{ color: oysterPalette.darkBrown }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CountryBlock;
