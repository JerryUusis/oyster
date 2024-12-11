import { useState } from "react";
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
  const [imageLoaded, setImageloaded] = useState(false);
  const oysterPalette = useOysterPalette();
  return (
    <Box
      sx={{
        display: "flex",
        width: "80%",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ position: "relative", height: "80px", width: "80px" }}>
        {!imageLoaded && (
          <Skeleton variant="rectangular" height="100%" width="100%" />
        )}
        <img
          src={country.flags.svg}
          height="80px"
          width="80px"
          alt={country.name.common}
          style={{ objectFit: "cover" }}
          loading="lazy"
          onLoad={() => setImageloaded(true)}
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
