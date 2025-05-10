"use client";

import { useSelectNewTaskPriority } from "../../../model/selectors/selectNewTaskFields";
import { memo } from "react";
import { TaskPriorityIcon } from "../../tasks-icons/priority-icon";

export const TaskCardPriorityClient = memo(function TaskCardPriorityClient() {
  const priority = useSelectNewTaskPriority();

  return (
    priority && <TaskPriorityIcon priority={priority} className="size-12" />
  );
});
