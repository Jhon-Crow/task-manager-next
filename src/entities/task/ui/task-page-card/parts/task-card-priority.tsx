import { TypePriorityTask } from "@/entities/task/model/types/task";
import { TaskPriorityIcon } from "../../tasks-icons/priority-icon";

export const TaskCardPriority = ({
  priority,
}: {
  priority: TypePriorityTask;
}) => <TaskPriorityIcon priority={priority} className="size-12" />;
