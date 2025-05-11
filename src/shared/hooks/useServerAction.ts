"use client";

import { toast } from "sonner";
import { ApiResult } from "../types";

export const useServerAction = <T, Args extends unknown[]>(
  callback: (...args: Args) => Promise<ApiResult<T>>
): ((...args: Args) => Promise<T | boolean | void>) => {
  const handleAction = async (...args: Args) => {
    const data = await callback(...args);
    if (!data.success) {
      toast.error(data.error.message);
      console.log(data.error.details);

      return false;
    }
    return data.data;
  };

  return handleAction;
};
