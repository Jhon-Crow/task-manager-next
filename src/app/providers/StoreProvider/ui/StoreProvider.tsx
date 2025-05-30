"use client";

import { ReducersMapObject } from "@reduxjs/toolkit";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";

interface StoreProviderProps {
  children: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = ({
  children,
  initialState,
  asyncReducers,
}: StoreProviderProps) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = createReduxStore(
      initialState as StateSchema,
      asyncReducers as ReducersMapObject<StateSchema>
    );
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
