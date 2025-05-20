import { getAllTasks, tasksReducer } from "@/entities/task";
import { DynamicModuleLoader } from "@/shared/lib/components";
import { TaskListDataTableWidget } from "@/widgets/task-list-data-table-widget";

const reducers: ReducersList = {
  taskApi: tasksReducer,
};

export default async function TasksListPage() {
  const data = await getAllTasks();
  if (!data.success) {
    //TODO
    return <div>{"Popa"}</div>;
  }
  return (
    <DynamicModuleLoader reducers={reducers}>
      <TaskListDataTableWidget />
      {/* <TaskListWidget tasks={data.data} /> */}
    </DynamicModuleLoader>
  );
}
