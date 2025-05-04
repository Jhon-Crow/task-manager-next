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

export function TaskPageCard({ task }: { task: TypeTask }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.id}</CardDescription>
      </CardHeader>
      <CardContent>{task.description}</CardContent>
      <CardFooter className="justify-between">
        <TaskPriorityIcon priority={task.priority} className="size-12" />
        <span>{formatDateToRuShort(task.createdAt)}</span>
      </CardFooter>
    </Card>
  );
}
