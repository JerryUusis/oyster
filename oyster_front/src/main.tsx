import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Use module augmentation to add new variables to Theme
// Access the custom theme using: import { useTheme } from "@mui/material/styles"
// Then define theme in a variable like this: const theme = useTheme().palette.oysterColors

declare module "@mui/material/styles" {
  interface Palette {
    oysterColors: {
      pink: string;
      olive: string;
      lightOlive: string;
      darkBrown: string;
      gray: string;
      babyBlue: string;
    };
  }
  interface PaletteOptions {
    oysterColors?: {
      pink?: string;
      olive?: string;
      lightOlive?: string;
      darkBrown?: string;
      gray?: string;
      babyBlue?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    oysterColors: {
      pink: "#C68E9D",
      olive: "#4B4D41",
      lightOlive: "#898D6F",
      darkBrown: "#341B11",
      gray: "#C3C5BC",
      babyBlue: "#A8BDE1",
    },
  },
  components: {},
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
