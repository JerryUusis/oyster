import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Input from "@mui/material/Input";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import { useOysterPalette } from "../utils/theme/theme";
import { useState } from "react";
import { CountryObject, UserObject } from "../utils/types";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setUser } from "../store/userSlice";
import { getLanguages } from "../utils/library";

interface SettingsMenuItemProps {
  settingName: string;
  currentValue?: string;
  buttonLabel?: string;
  editFunction?: editFunction;
  logoutFunction?: logoutFunction;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

type logoutFunction = () => void;
type editFunction = (
  userObject: UserObject,
  keyToUpdate: keyof UserObject,
  newValue: string
) => Promise<void>;

const SettingsMenuItem = ({
  settingName,
  currentValue,
  buttonLabel,
  editFunction,
  logoutFunction,
  icon: Icon,
}: SettingsMenuItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(currentValue);

  const user = useAppSelector((state) => state.user);
  const countries = useAppSelector(
    (state) => state.countries
  ) as CountryObject[];
  const dispatch = useAppDispatch();
  const languages = getLanguages(countries);

  const oysterPalette = useOysterPalette();

  const handleClick = async () => {
    if (logoutFunction) {
      return logoutFunction();
    } else {
      setIsEditing(true);
    }

    // Edit user object fields and update Redux state
    if (isEditing && editFunction && user) {
      let keyToUpdate;
      switch (settingName) {
        case "Username":
        case "Email":
        case "Location":
          keyToUpdate = settingName.toLowerCase() as keyof UserObject;
          break;
        // TODO: Add an array of strings containing all of the languages with an autocomplete menu
        case "Spoken languages":
          keyToUpdate = "languages" as keyof UserObject;
          break;
        case "Theme color":
          keyToUpdate = "theme" as keyof UserObject;
          break;
        default:
          console.error(`Unknown setting: ${settingName}`);
      }

      if (keyToUpdate) {
        const response = await editFunction(user, keyToUpdate, newValue);
        dispatch(setUser(response));
        setIsEditing(false);
      }
    }
  };

  // Choose the right input for the right type
  const setInput = () => {
    if (
      settingName === "Username" ||
      settingName === "Email" ||
      settingName === "Location" ||
      settingName === "Theme color"
    ) {
      return (
        <Input onChange={(e) => setNewValue(e.target.value)} value={newValue} />
      );
    } else if (settingName === "Spoken languages") {
      return (
        <Autocomplete
          options={languages}
          renderInput={(params) => <TextField {...params} label="Languages" />}
        />
      );
    }
  };

  return (
    <Box>
      <ListItem>
        {Icon ? (
          <ListItemIcon sx={{ color: oysterPalette.darkBrown }}>
            <Icon />
          </ListItemIcon>
        ) : null}
        <ListItemText
          primary={settingName}
          secondary={!isEditing ? currentValue : setInput()}
        />
        <Button
          variant="text"
          sx={{ textDecoration: "underline", color: oysterPalette.darkBrown }}
          onClick={handleClick}
        >
          {isEditing ? "save" : buttonLabel}
        </Button>
      </ListItem>
      <Divider variant="middle" />
    </Box>
  );
};

export default SettingsMenuItem;
