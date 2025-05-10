"use client";

import { useSelectNewTaskTitle } from "@/entities/task/model/selectors/selectNewTaskFields";
import { memo } from "react";
import { TaskCardTitle } from "../../task-page-card/parts";

export const TaskCardTitleClient = memo(function TaskCardTitleClient() {
  const title = useSelectNewTaskTitle();
  return (
    <TaskCardTitle
      title={
        title ? (
          title
        ) : (
          <span className="opacity-30">Введите название задачи</span>
        )
      }
    />
  );
});
