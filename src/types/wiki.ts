/** Expected response types for Wikipedia On This Day event */

export type WikiOnThisDayTitle = {
  canonical: string;
  display: string;
  normalized: string;
};

export type WikiOnThisDayWikipedia = {
  desktop: {
    page: string;
  };
  mobile: {
    page: string;
  };
};

export type WikiOnThisDayThumbnail = {
  source: string;
  width: number;
  height: number;
};

export type WikiOnThisDayEventPage = {
  titles: WikiOnThisDayTitle;
  content_urls: WikiOnThisDayWikipedia;
  description: string;
  timestamp: string;
  thumbnail?: WikiOnThisDayThumbnail;
};

export type WikiOnThisDayEvent = {
  text: string;
  year: number;
  pages: Array<WikiOnThisDayEventPage>;
};

export type WikiOnThisDayResponse = {
  events: Array<WikiOnThisDayEvent>;
};
