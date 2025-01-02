import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CountriesList from "../components/CountriesList";
import { useOysterPalette } from "../utils/theme/theme";

const Explore = () => {
  const oysterPalette = useOysterPalette();
  return (
    <Box
      pt={"56px"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        backgroundColor: oysterPalette.lightPink,
        width: "100vw",
      }}
    >
      <Typography variant="h2">Explore</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          width: "100vw",
          backgroundColor: oysterPalette.lightPink,
        }}
      >
        <CountriesList />
      </Box>
    </Box>
  );
};

export default Explore;
