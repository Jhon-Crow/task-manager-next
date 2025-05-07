import { getAllTasks } from "@/entities/task";
import { TaskListWidget } from "@/widgets/task-list-widget";

export default async function TasksListPage() {
  const data = await getAllTasks();
  if (!data.success) {
    //TODO
    return <div>{"Popa"}</div>;
  }
  return <TaskListWidget tasks={data.data} />;
}
