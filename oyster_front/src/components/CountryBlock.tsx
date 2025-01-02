import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { useOysterPalette } from "../utils/theme/theme";
import { CountryObject } from "../utils/types";

interface CountryBlockProps {
  country: CountryObject;
}

const CountryBlock = ({ country }: CountryBlockProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const oysterPalette = useOysterPalette();

  // TODO: Have this for basis for optimizing image load times using caching
  useEffect(() => {
    if (imageRef.current?.complete) {
      setImageloaded(true);
    }
  }, []);

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
          onLoad={() => setImageloaded(true)}
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
          <IconButton>
            <FavoriteIcon sx={{ color: oysterPalette.darkBrown }} />
          </IconButton>
          <IconButton>
            <CheckCircleIcon sx={{ color: oysterPalette.darkBrown }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CountryBlock;
