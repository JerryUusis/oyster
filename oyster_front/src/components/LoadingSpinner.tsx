import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "calc(100vh - 56px)", // Offset the height of the Header.tsx
      }}
    >
      <CircularProgress sx={{ mb: "56px" }} />
    </Box>
  );
};

export default LoadingSpinner;
