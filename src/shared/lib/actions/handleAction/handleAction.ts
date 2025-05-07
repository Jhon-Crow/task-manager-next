"server only";

import { ApiResult } from "../../../types";

export async function handleAction<T>(
  action: () => Promise<T>
): Promise<ApiResult<T>>;
export async function handleAction<T, Arg>(
  action: (arg: Arg) => Promise<T>,
  arg: Arg
): Promise<ApiResult<T>>;
export async function handleAction<T, Args extends unknown[]>(
  action: (...args: Args) => Promise<T>,
  ...args: Args
): Promise<ApiResult<T>>;
export async function handleAction<T, Args extends unknown[]>(
  action: (...args: Args) => Promise<T>,
  ...args: Args
): Promise<ApiResult<T>> {
  try {
    const data = await action(...args);
    return { success: true, data };
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    const code =
      error && typeof error === "object" && "code" in error
        ? String(error.code)
        : undefined;

    return { success: false, error: { message, code, details: error } };
  }
}
