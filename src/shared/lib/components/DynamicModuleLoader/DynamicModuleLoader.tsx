"use client";

import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppStore } from "@/shared/hooks/useAppStore";
import { FC, PropsWithChildren, useLayoutEffect } from "react";

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<
  PropsWithChildren<DynamicModuleLoaderProps>
> = (props) => {
  const { children, reducers, removeAfterUnmount } = props;

  const store = useAppStore();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const mountedReducers = store.reducerManager.getReducerMap();
    console.log(reducers, mountedReducers);

    Object.entries(reducers).forEach(([name, reducer]) => {
      if (!mountedReducers[name as StateSchemaKey]) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name}` });
      }
    });
    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name}` });
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};
