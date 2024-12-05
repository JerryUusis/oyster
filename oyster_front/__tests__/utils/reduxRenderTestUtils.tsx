import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react"; 
import { Provider } from "react-redux";
import type { RenderOptions } from "@testing-library/react";
import setupStore from "../../src/store/store";
import type { AppStore, RootState } from "../../src/store/store";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "../../src/utils/theme/theme";
import { BrowserRouter as Router } from "react-router-dom";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

// Render virtual DOM using MUI theme, React Router and Redux store
const renderWithThemeAndProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
): {
  store: AppStore;
  container: HTMLElement;
  baseElement: HTMLElement;
  debug: (baseElement?: HTMLElement, maxLength?: number, options?: any) => void;
} => {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>{children}</Router>
      </ThemeProvider>
    </Provider>
  );

  // Return the store and the result of render
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export { renderWithThemeAndProviders };
