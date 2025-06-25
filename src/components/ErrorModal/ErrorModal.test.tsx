import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import ErrorModal from "./ErrorModal";
import { initialState, useWikiStore } from "../../store/wikiStore";
import { ApiError, handleApiError } from "../../utils/errorHandler";
import { ThemeProvider, createTheme } from "@mui/material/styles";

/** A basic theme for testing */
const theme = createTheme({
  transitions: {
    duration: {
      enteringScreen: 0,
      leavingScreen: 0,
    },
  },
  palette: {
    error: { main: "#f44336" },
  },
});

describe("ErrorModal", () => {
  /** Reset store state before each test case */
  beforeEach(() => useWikiStore.setState(initialState));

  const dialogTitle = "Error Fetching Data";

  it("is not visible when there is no error in the store", () => {
    render(
      <ThemeProvider theme={theme}>
        <ErrorModal />
      </ThemeProvider>
    );

    const dialog = screen.queryByRole("dialog", {
      name: new RegExp(dialogTitle, "i"),
    });

    expect(dialog).not.toBeInTheDocument();
  });

  it("is visible when events request fails, and it removes store error on closing", async () => {
    const errorMessage = "Something went wrong";
    /** Store now has error */
    useWikiStore.setState({
      error: handleApiError(new ApiError(errorMessage, 500)),
    });

    render(
      <ThemeProvider theme={theme}>
        <ErrorModal />
      </ThemeProvider>
    );

    /** Wait for modal to appear */
    const dialog = await screen.findByRole("dialog", {
      name: new RegExp(dialogTitle, "i"),
    });
    const closeButton = await screen.findByRole("button", { name: /close/i });

    /** Confirm modal & button are present */
    expect(dialog).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    /** Click close */
    await userEvent.click(closeButton);
    /** Wait for modal to disappear */
    await waitFor(() => {
      expect(dialog).not.toBeInTheDocument();
      expect(closeButton).not.toBeInTheDocument();
      /** store error is removed on modal closing */
      expect(useWikiStore.getState().error).toBeNull();
    });
  });
});
