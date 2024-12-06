import IconButton from "@mui/material/IconButton";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import { useTheme } from "@mui/material/styles";
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
  const oysterTheme = useTheme().palette.oysterColors;
  return (
    <IconButton
      sx={{ color: oysterTheme.darkBrown }}
      component={path ? Link : IconButton}
      to={path}
      data-testid={dataTestId}
    >
      <Icon />
    </IconButton>
  );
};

export default MenuBarButton;
