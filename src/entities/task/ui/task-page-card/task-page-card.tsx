import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui";
import { TypeTask } from "../../model/types/task";
import { formatDateToRuShort } from "@/shared/lib/format/formatDayToRuShort";
import { TaskPriorityIcon } from "../tasks-icons/priority-icon";
import { TaskDifficultyIcon } from "../tasks-icons/difficulty-icon";

export function TaskPageCard({
  task,
  className,
}: {
  task: TypeTask;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.id}</CardDescription>
      </CardHeader>
      <CardContent>{task.description}</CardContent>
      <CardFooter className="justify-between">
        <div className="flex gap-x-4">
          <TaskPriorityIcon priority={task.priority} className="size-12" />
          <TaskDifficultyIcon difficult={task.difficulty} className="size-12" />
        </div>
        <span>{formatDateToRuShort(task.createdAt)}</span>
      </CardFooter>
    </Card>
  );
}
