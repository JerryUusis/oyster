import { ReactNode } from "react"; // ReactNode is type for React element
import { render, RenderResult } from "@testing-library/react"; // RenderResult is a type for object that render method returns
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "../../src/utils/theme/theme";

// Create virtual DOM using MUI theme provider and the theme currently in use
const renderWithTheme = (ui: ReactNode): RenderResult => {
  return render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {ui}
    </ThemeProvider>
  );
};

export default renderWithTheme;
