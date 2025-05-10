import type {
  Reducer,
  ReducersMapObject,
  StateFromReducersMapObject,
  UnknownAction,
} from "@reduxjs/toolkit";

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (
    state: StateSchema,
    action: UnknownAction
  ) => StateFromReducersMapObject<ReducersMapObject<StateSchema>>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}
