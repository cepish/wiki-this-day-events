/**
 * Custom error class to represent API-related errors with HTTP status codes.
 *
 * @extends Error
 * @property {number} status - The HTTP status code associated with the error.
 */
export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Handles API errors by extracting relevant information.
 * @param error - The error object to handle, which can be an instance of ApiError or a default Error.
 * @returns An object containing error details.
 */
export const handleApiError = (error: unknown) => {
  const defaultErrorMessage = "An unknown error occurred";
  if (error instanceof ApiError) {
    /** An error with a specific status code */
    return {
      error: true,
      message: error.message || defaultErrorMessage,
      status: error.status,
    };
  }
  /** A default error */
  return {
    error: true,
    message: (error as Error).message || defaultErrorMessage,
    status: 500,
  };
};
