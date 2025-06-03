import { getAllTasks, tasksListReducer, tasksReducer } from "@/entities/task";
import { DynamicModuleLoader } from "@/shared/lib/components";
import { TaskListDataTableWidget } from "@/widgets/task-list-data-table-widget";
import {TaskListWidget} from "@/widgets/task-list-widget";

const reducers: ReducersList = {
  taskApi: tasksReducer,
  tasksListSlice: tasksListReducer,
};

export default async function TasksListPage() {
  const data = await getAllTasks();
  if (!data.success) {
    //TODO
    console.log(data.error.message)
    return <div>{data.error.message}</div>;
  }
  return (
    <DynamicModuleLoader reducers={reducers}>
      <TaskListDataTableWidget />
    </DynamicModuleLoader>
  );
}
