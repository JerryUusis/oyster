import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useOysterPalette } from "../utils/theme/theme";

const ProfilePicUpload = () => {
  const oysterPalette = useOysterPalette();
  const defaultBackground = {
    // create a checker pattern background
    background: `repeating-conic-gradient(${oysterPalette.lightGray} 0% 25%, #fff 0% 50%)`,
    backgroundSize: "29.5px 29.5px",
    height: "236px",
    width: "236px",
    position: "relative",
  };

  return (
    <Box sx={defaultBackground}>
      <IconButton
        sx={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          transform: `translate(-50%, -50%)`,
          color: oysterPalette.darkBrown,
        }}
      >
        <AddAPhotoIcon />
      </IconButton>
    </Box>
  );
};

export default ProfilePicUpload;
