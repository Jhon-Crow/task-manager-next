import type { TypeTask } from "../../model/types/task";
import { TaskListCard } from "../task-list-card/task-list-card";
import { TimerProvider } from "@/shared/providers";

export function TaskList({ tasks }: { tasks: TypeTask[] }) {
  return (
    <div className="space-y-4">
      <TimerProvider>
        {tasks.map((task) => (
          <TaskListCard task={task} key={task.id} />
        ))}
      </TimerProvider>
    </div>
  );
}
