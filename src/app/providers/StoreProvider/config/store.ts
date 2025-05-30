import {
  currentPageReducer,
  currentPageReducerName,
} from "@/shared/lib/slices/currentPage";
import {
  configureStore,
  StateFromReducersMapObject,
  type ReducersMapObject,
} from "@reduxjs/toolkit";
import { createReducerManager } from "./reducerManager";
import { tasksMiddleware } from "@/entities/task";

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    [currentPageReducerName]: currentPageReducer,
    ...asyncReducers,
  };
  const reducerManager = createReducerManager(rootReducer);

  const store = configureStore({
    devTools: true,
    reducer: reducerManager.reduce as StateFromReducersMapObject<StateSchema>,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tasksMiddleware),
  });

  return Object.assign(store, { reducerManager });
}
