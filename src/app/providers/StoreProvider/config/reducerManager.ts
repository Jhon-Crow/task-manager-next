import {
  combineReducers,
  Reducer,
  StateFromReducersMapObject,
  type ReducersMapObject,
} from "@reduxjs/toolkit";
import { ReducerManager } from "../types/ReducerManager";

export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducers = combineReducers(reducers);

  let keysToRemove: StateSchemaKey[] = [];

  return {
    getReducerMap: () => reducers,
    reduce: (state: StateSchema, action) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        keysToRemove.forEach((key) => {
          delete state[key];
        });
        keysToRemove = [];
      }

      return combinedReducers(
        state as StateFromReducersMapObject<ReducersMapObject<StateSchema>>,
        action
      );
    },
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) return;

      reducers[key] = reducer;
      combinedReducers = combineReducers(reducers);
    },
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) return;
      delete reducers[key];
      keysToRemove.push(key);
      combinedReducers = combineReducers(reducers);
    },
  };
}
