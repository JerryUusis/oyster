import IconButton from "@mui/material/IconButton";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import { useOysterPalette } from "../utils/theme/theme";
import { Link } from "react-router-dom";

interface MenuBarButtonProps {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  path?: string;
  dataTestId: string;
}

const MenuBarButton = ({
  icon: Icon,
  path,
  dataTestId,
}: MenuBarButtonProps) => {
  const oysterPalette = useOysterPalette();
  return (
    <IconButton
      sx={{ color: oysterPalette.darkBrown }}
      component={path ? Link : IconButton}
      to={path}
      data-testid={dataTestId}
    >
      <Icon />
    </IconButton>
  );
};

export default MenuBarButton;
