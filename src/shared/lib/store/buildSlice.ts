"use client";

import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import {
  bindActionCreators,
  createSlice,
  type CreateSliceOptions,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";
import { useMemo } from "react";

export function buildSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string,
  Selectors extends SliceSelectors<State>,
  ReducerPath extends string = Name
>(
  options: CreateSliceOptions<State, CaseReducers, Name, ReducerPath, Selectors>
) {
  const slice = createSlice(options);

  const useActions = (): typeof slice.actions => {
    const dispatch = useAppDispatch();

    return useMemo(
      () => bindActionCreators(slice.actions, dispatch),
      [dispatch]
    );
  };
  return { ...slice, useActions };
}
