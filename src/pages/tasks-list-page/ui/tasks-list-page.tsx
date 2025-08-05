import {tasksListReducer, tasksReducer} from "@/entities/task";
import {DynamicModuleLoader} from "@/shared/lib/components";
import {TaskListDataTableWidget} from "@/widgets/task-list-data-table-widget";

const reducers: ReducersList = {
  taskApi: tasksReducer,
  tasksListSlice: tasksListReducer,
};

export default async function TasksListPage() {
  return (
      <DynamicModuleLoader reducers={reducers}>
          <TaskListDataTableWidget />
      </DynamicModuleLoader>
  );
}
