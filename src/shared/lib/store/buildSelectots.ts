"use client";

import { useAppSelector } from "@/shared/hooks/useAppSelector";

type Selector<T, Args extends unknown[]> = (
  state: StateSchema,
  ...args: Args
) => T;
type Hook<T, Args extends unknown[]> = (...args: Args) => T;
type Result<T, Args extends unknown[]> = [Hook<T, Args>, Selector<T, Args>];

export function buildSelectors<T, Args extends unknown[]>(
  selector: Selector<T, Args>
): Result<T, Args> {
  const useSelectorHook: Hook<T, Args> = (...args) =>
    useAppSelector((state: StateSchema) => selector(state, ...args));

  return [useSelectorHook, selector];
}
