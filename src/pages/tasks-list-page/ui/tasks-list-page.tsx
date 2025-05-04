import { getAllTasks } from "@/entities/task";
import { TaskListWidget } from "@/widgets/task-list-widget";

export default async function TasksListPage() {
  const tasks = await getAllTasks();
  if (!(tasks instanceof Object)) {
    return <div>{tasks}</div>;
  }
  return <TaskListWidget tasks={tasks} />;
}
