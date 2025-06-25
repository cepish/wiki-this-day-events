import { wikiApi } from "../api/wikiApi";
import type { WikiOnThisDayEvent, WikiOnThisDayResponse } from "../types/wiki";
import { ApiError, handleApiError } from "../utils/errorHandler";
import { useWikiStore, initialState } from "./wikiStore";

jest.mock("../api/wikiApi", () => ({
  wikiApi: {
    getOnThisDayEvent: jest.fn(),
  },
}));

const mockEvents: Array<WikiOnThisDayEvent> = [
  { year: 1990, text: "Event B", pages: [] },
  { year: 2000, text: "Event A", pages: [] },
];

const mockEventsSortedByYear: Array<WikiOnThisDayEvent> = [...mockEvents].sort(
  (a, b) => b.year - a.year
);

describe("wikiStore: Actions", () => {
  /** Reset store state before each test case */
  beforeEach(() => useWikiStore.setState(initialState));
  /** Reset mocks before each test case */
  beforeEach(() => (wikiApi.getOnThisDayEvent as jest.Mock).mockReset());

  test("clearError: should clear store error on call", () => {
    /** Set an error into the store's state. */
    useWikiStore.setState({
      error: handleApiError(new ApiError("Test Error", 500)),
    });
    /** Store has to hold error now */
    expect(useWikiStore.getState().error).not.toBeNull();
    /** Call clearError() */
    useWikiStore.getState().clearError();
    /** Error state is reset to null */
    expect(useWikiStore.getState().error).toBeNull();
  });

  test("fetchEvents: should add events data in case of successful request", async () => {
    /** Mock a successful API response */
    const successfulApiResponse: WikiOnThisDayResponse = {
      events: mockEvents,
    };
    (wikiApi.getOnThisDayEvent as jest.Mock).mockResolvedValueOnce(
      successfulApiResponse
    );

    const request = useWikiStore.getState().fetchEvents();
    /** Request is in progress now  */
    expect(useWikiStore.getState().loaded).toBe(false);
    expect(useWikiStore.getState().loading).toBe(true);
    expect(useWikiStore.getState().error).toBe(null);
    expect(useWikiStore.getState().data).toBe(null);
    /** Request is done now  */
    await request;

    expect(useWikiStore.getState().loaded).toBe(true);
    expect(useWikiStore.getState().loading).toBe(false);
    expect(useWikiStore.getState().error).toBe(null);
    expect(useWikiStore.getState().data).not.toBe(null);
    /** Check that events are sorted by year */
    expect(useWikiStore.getState().data).toEqual(mockEventsSortedByYear);
  });

  test("fetchEvents: should add error info if request fails", async () => {
    const errorStatus = 400;
    const errorMessage = "Failed to fetch events";

    const genericError = new ApiError(errorMessage, errorStatus);
    (wikiApi.getOnThisDayEvent as jest.Mock).mockRejectedValueOnce(
      genericError
    );
    /** No need to test "in-progress" again, already tested above */
    await useWikiStore.getState().fetchEvents();
    /** Verify that error data is set to store */
    expect(useWikiStore.getState().loading).toBe(false);
    expect(useWikiStore.getState().loaded).toBe(false);
    expect(useWikiStore.getState().data).toBe(null);
    expect(useWikiStore.getState().error).toEqual({
      error: true,
      status: errorStatus,
      message: errorMessage,
    });
  });
});
