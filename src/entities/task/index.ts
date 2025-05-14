export { TaskFormSkeleton } from "./ui/task-form/skeleton/task-form-skeleton";

export { deleteTaskById } from "./model/service/deleteTaskById/deleteTaskById";

export { useSelectTaskTitle } from "./model/selectors/selectTask";

export { useSelectTask } from "./model/selectors/selectTask";

export { TaskPageCardClient } from "./ui/task-page-card-client/task-page-card-client";
export { createTask } from "./model/service/createTask/createTask";
export { getTaskById } from "./model/service/getTaskById/getTaskById";
export { getAllTasks } from "./model/service/getAllTasks/getAllTasks";
export { TaskProvider } from "./provider/TaskProvider";
export { TaskList } from "./ui/task-list/task-list";
export { TaskForm } from "./ui/task-form/task-form";
export { TaskPageCard } from "./ui/task-page-card/task-page-card";
export {
  name as taskReducerName,
  reducer as taskReducer,
  setTask,
  useActions as useTaskActions,
} from "./model/slice/taskSlice";
