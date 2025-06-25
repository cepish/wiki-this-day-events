import { jsonApi } from "./jsonApi";
import type { WikiOnThisDayResponse } from "../types/wiki";

const getTodaysDate = (today = new Date()) => ({
  month: today.getMonth() + 1,
  day: today.getDate(),
});

/** Centralized Wikipedia API request fetcher */
export const wikiApi = {
  getOnThisDayEvent: async () => {
    const { month, day } = getTodaysDate();
    const uri = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;

    return await jsonApi<WikiOnThisDayResponse>(uri);
  },
  /**
   * Potentially add other Wikipedia API request fetchers here, e.g.
   * getOnThisNextDayEvent, etc
   */
};
