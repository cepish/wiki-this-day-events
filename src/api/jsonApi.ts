import { ApiError } from "../utils/errorHandler";

/**
 * An extra layer to carry out async requests.
 * The function may be used as a centralized request configuration,
 * e.g. for http headers, error handling,
 * logging, monitoring, and potentially for lib change
 */
export const jsonApi = async <T>(
  url: string,
  init?: RequestInit
): Promise<T> => {
  const response = await fetch(url, { ...(init || {}) });

  if (!response.ok) {
    const errorBody = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    /** If something goes wrong, we return a generic error */
    const error = new ApiError(errorBody.message, response.status);
    throw error;
  }

  return (await response.json()) as T;
};
