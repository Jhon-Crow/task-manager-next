import { currentPageReducerName } from "@/shared/lib/slices/currentPage";
import type { CurrentPageSchema } from "@/shared/lib/slices/currentPage/public-types";
import { createReduxStore } from "../config/store";
import { taskReducerName, tasksReducerName } from "@/entities/task";
import { TaskSchema, TasksResponse } from "@/entities/task/public-types";
import { UserSchema } from "@/entities/user/types";
import { userReducerName } from "@/entities/user";

declare global {
  interface StateSchema {
    [currentPageReducerName]: CurrentPageSchema;
    [taskReducerName]?: TaskSchema;
    [userReducerName]?: UserSchema;
    [tasksReducerName]?: TasksResponse;
  }
  type StateSchemaKey = keyof StateSchema;

  type AppStore = ReturnType<typeof createReduxStore>;
  type RootState = ReturnType<AppStore["getState"]>;
  type AppDispatch = AppStore["dispatch"];

  type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
  };
}
