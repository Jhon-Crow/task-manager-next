import { ApiError } from "./errors";

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError };
