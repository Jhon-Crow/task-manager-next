"use client";

import { memo } from "react";
import { TaskCardDeadline } from "../../task-page-card/parts";
import { useSelectNewTaskDeadline } from "../../../model/selectors/selectNewTaskFields";
import { useSelectTaskCreatedAt } from "../../../model/selectors/selectTask";

export const TaskCardDeadlineClient = memo(function TaskCardDeadlineClient() {
  const deadline = useSelectNewTaskDeadline();
  const createdAt = useSelectTaskCreatedAt();
  return (
    deadline && (
      <TaskCardDeadline
        deadline={new Date(deadline)}
        createdAt={new Date(createdAt || new Date()) || new Date()}
      />
    )
  );
});
