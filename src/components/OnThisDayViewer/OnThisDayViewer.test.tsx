import { render, screen } from "@testing-library/react";
import { initialState, useWikiStore } from "../../store/wikiStore";
import { createTheme, ThemeProvider } from "@mui/material";
import OnThisDayViewer from "./OnThisDayViewer";
import userEvent from "@testing-library/user-event";
import { wikiApi } from "../../api/wikiApi";
import type {
  WikiOnThisDayEvent,
  WikiOnThisDayResponse,
} from "../../types/wiki";
import { ApiError } from "../../utils/errorHandler";

jest.mock("../../api/wikiApi.ts", () => ({
  wikiApi: {
    getOnThisDayEvent: jest.fn(),
  },
}));

const mockEvents: Array<WikiOnThisDayEvent> = [
  {
    year: 1990,
    text: "Event B",
    pages: [
      {
        description: "Event B description",
        titles: {
          canonical: "",
          display: "",
          normalized: "Event B Normalized Title",
        },
        content_urls: { desktop: { page: "" }, mobile: { page: "" } },
        timestamp: "",
      },
    ],
  },
  {
    year: 2000,
    text: "Event A",
    pages: [
      {
        description: "Event A description",
        titles: {
          canonical: "",
          display: "",
          normalized: "Event A Normalized Title",
        },
        content_urls: { desktop: { page: "" }, mobile: { page: "" } },
        timestamp: "",
      },
    ],
  },
];

const theme = createTheme({
  palette: {
    // Define colors used in the component
    primary: { main: "#535bf2", contrastText: "#ffffff", dark: "#3a3eb2" },
    text: { primary: "#ffffff", secondary: "#b0b0b0" },
  },
});

describe("OnThisDayViewer", () => {
  /** Reset store state before each test case */
  beforeEach(() => useWikiStore.setState(initialState));

  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <OnThisDayViewer />
      </ThemeProvider>
    );
  });

  const fetchEventsText = new RegExp("Fetch Events", "i");
  const loadingText = new RegExp("Loading Events...", "i");
  const noResultsText = new RegExp("No today events found.", "i");
  /**
   * Helper function to click on the "Fetch Events" button
   * and assert that the request has finished.
   */
  const clickOnButtonAndAssertFinishedRequest = async () => {
    const user = userEvent.setup();
    const fetchButton = screen.getByRole("button", { name: fetchEventsText });
    /** Simulate user click */
    await user.click(fetchButton);

    expect(fetchButton).not.toBeInTheDocument();
    expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
    expect(screen.queryByText(noResultsText)).not.toBeInTheDocument();
  };

  test("initial state, 'Fetch Events' button is not clicked yet", () => {
    screen.getByText(fetchEventsText);
    expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
    expect(screen.queryByText(noResultsText)).not.toBeInTheDocument();
  });

  test('clicking on "Fetch Events" button transitions to loading state', async () => {
    const user = userEvent.setup();
    /** Init a pending promise to test loading state */
    (wikiApi.getOnThisDayEvent as jest.Mock).mockImplementationOnce(
      () => new Promise(() => null)
    );

    /** 'Fetch Events' button has to be visible */
    const fetchButton = screen.getByRole("button", { name: fetchEventsText });
    /** Simulate user click */
    await user.click(fetchButton);

    expect(fetchButton).not.toBeInTheDocument();
    expect(screen.queryByText(loadingText)).toBeInTheDocument();
    expect(screen.queryByText(noResultsText)).not.toBeInTheDocument();
  });

  test('clicking on "Fetch Events" button successful case', async () => {
    /** Mock a successful API response */
    const successfulApiResponse: WikiOnThisDayResponse = {
      events: mockEvents,
    };
    /** Init a pending promise to test loading state */
    (wikiApi.getOnThisDayEvent as jest.Mock).mockResolvedValueOnce(
      successfulApiResponse
    );

    await clickOnButtonAndAssertFinishedRequest();

    /** Check for events being present in the screen */
    mockEvents.forEach((mockEvent) => {
      const { pages, year } = mockEvent;
      /** Event year has to be present */
      screen.getByText(new RegExp(String(year), "i"));
      /** Normalized title has to be present */
      pages.forEach((page) => {
        screen.getByText(new RegExp(page.titles.normalized, "i"));
      });
    });
  });

  test('clicking on "Fetch Events" button failed case', async () => {
    const errorStatus = 400;
    const errorMessage = "Failed to fetch events";
    const genericError = new ApiError(errorMessage, errorStatus);
    /** Init a pending promise to test loading state */
    (wikiApi.getOnThisDayEvent as jest.Mock).mockRejectedValueOnce(
      genericError
    );

    await clickOnButtonAndAssertFinishedRequest();

    /** Check for events NOT being present in the screen */
    mockEvents.forEach((mockEvent) => {
      const { pages, year } = mockEvent;
      /** NO Event year now */
      expect(
        screen.queryByText(new RegExp(String(year), "i"))
      ).not.toBeInTheDocument();
      /** NO Normalized title now */
      pages.forEach((page) => {
        expect(
          screen.queryByText(new RegExp(page.titles.normalized, "i"))
        ).not.toBeInTheDocument();
      });
    });
  });
});
