import type { ErrorResponse, SuccessResponse } from "../types/api";

export function successResponse<T>(
  data: T,
  message = "Success",
): SuccessResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse(message = "Something went wrong"): ErrorResponse {
  return {
    success: false,
    message,
  };
}
