import Box from "@mui/material/Box";
import Flag from "@mui/icons-material/Flag";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

interface CountryBlockProps {
  country: string;
}

const CountryBlock = ({ country }: CountryBlockProps) => {
  const oysterTheme = useTheme().palette.oysterColors;
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
          backgroundColor: oysterTheme.gray,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontWeight={"bold"}>{country}</Typography>
        <Box>
          <IconButton>
            <FavoriteIcon sx={{ color: oysterTheme.darkBrown }} />
          </IconButton>
          <IconButton>
            <CheckCircleIcon sx={{ color: oysterTheme.darkBrown }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CountryBlock;
