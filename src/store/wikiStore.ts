import { create } from "zustand";
import { wikiApi } from "../api/wikiApi";
import type { WikiOnThisDayEvent } from "../types/wiki";
import type { JsonApiError } from "../types/errors";
import { handleApiError } from "../utils/errorHandler";

type StoreState = {
  data: Array<WikiOnThisDayEvent> | null;
  loading: boolean;
  loaded: boolean;
  error: JsonApiError | null;
};

type WikiState = StoreState & {
  /**
   * Action to fetch Wikipedia "On This Day" events for a given month and day.
   * Updates loading, error, and data states accordingly.
   */
  fetchEvents: () => Promise<void>;
  /**
   * Action to clear any current error message,
   * e.g. may be called after an error modal is closed.
   */
  clearError: () => void;
};

export const initialState: StoreState = {
  data: null,
  loading: false,
  error: null,
  loaded: false,
};

/**
 * Store for managing Wikipedia "On This Day" data.
 *
 * @param set - A function provided by Zustand to update the store's state.
 * @returns An object containing the initial state and actions.
 */
export const useWikiStore = create<WikiState>((set) => ({
  /** --- Initial State --- */
  ...initialState,
  /** --- Actions --- */

  fetchEvents: async () => {
    /** Init loading and clear any previous errors */
    set({ loading: true, error: null, data: null });

    try {
      /**
       * If the request is successful, update the data state with the response
       * The response entries are sorted by year
       */
      const response = await wikiApi.getOnThisDayEvent();
      /** Create a shallow copy before sorting to avoid mutating the original response object */
      const sortedEvents: Array<WikiOnThisDayEvent> = [
        ...(response.events || []),
      ].sort((a, b) => b.year - a.year);

      set({
        data: sortedEvents,
        loaded: true,
        loading: false,
      });
    } catch (error) {
      return set({
        error: handleApiError(error),
        loaded: false,
        loading: false,
      });
    } finally {
      /** Ensure loading is set to false regardless of success or failure */
      set({ loading: false });
    }
  },

  clearError: () => {
    /** Action to clear the error state */
    set({ error: null, loaded: false });
  },
}));
