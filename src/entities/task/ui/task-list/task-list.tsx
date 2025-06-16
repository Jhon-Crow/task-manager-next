import { cn } from "@/shared/lib/utils";
import type { TypeTask } from "../../model/types/task";
import { TaskListCard } from "../task-list-card/task-list-card";
import { TimerProvider } from "@/shared/providers";

export function TaskList({
  tasks,
  className,
}: {
  tasks: TypeTask[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      <TimerProvider>
        {tasks.map((task) => (
          <TaskListCard task={task} key={task.id} />
        ))}
      </TimerProvider>
    </div>
  );
}
