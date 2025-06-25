import { ThemeProvider } from "@mui/material/styles";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { theme } from "./theme.ts"; // Your custom theme
import { CssBaseline } from "@mui/material";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {/* MUI's CssBaseline is crucial for consistent styling across browsers.
        It effectively acts as a modern CSS reset, applying a consistent
        baseline for all HTML elements and integrating with the MUI theme.
        It should be placed *inside* ThemeProvider.
      */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
