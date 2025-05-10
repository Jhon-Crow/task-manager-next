import { currentPageReducerName } from "@/shared/lib/slices/currentPage";
import type { CurrentPageSchema } from "@/shared/lib/slices/currentPage/public-types";
import { createReduxStore } from "../config/store";
import { taskReducerName } from "@/entities/task";
import { TaskSchema } from "@/entities/task/public-types";

declare global {
  interface StateSchema {
    [currentPageReducerName]: CurrentPageSchema;
    [taskReducerName]?: TaskSchema;
  }
  type StateSchemaKey = keyof StateSchema;

  type AppStore = ReturnType<typeof createReduxStore>;
  type RootState = ReturnType<AppStore["getState"]>;
  type AppDispatch = AppStore["dispatch"];

  type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
  };
}
