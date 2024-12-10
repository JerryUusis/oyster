import Box from "@mui/material/Box";
import Flag from "@mui/icons-material/Flag";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { useOysterPalette } from "../utils/theme/theme";

interface CountryBlockProps {
  country: string;
}

const CountryBlock = ({ country }: CountryBlockProps) => {
  const oysterPalette = useOysterPalette();
  return (
    <Box
      sx={{ display: "flex", width: "80%", justifyContent: "space-between" }}
    >
      <Box width="20%" sx={{ backgroundColor: "white" }}>
        <Flag />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "80%",
          backgroundColor: oysterPalette.gray,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontWeight={"bold"}>{country}</Typography>
        <Box>
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
