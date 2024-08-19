import { ReactNode } from "react"; // ReactNode is type for React element
import { render, RenderResult } from "@testing-library/react"; // RenderResult is a type for object that render method returns
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "../../src/utils/theme/theme";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../src/store/store";

// Create virtual DOM using React Router, Redux store Provider, MUI theme provider and the theme currently in use
const renderWithThemeAndProviders = (ui: ReactNode): RenderResult => {
  return render(
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {ui}
        </ThemeProvider>
      </Provider>
    </Router>
  );
};

export { renderWithThemeAndProviders };
