"use client";

import { useSelectNewTaskDescription } from "@/entities/task/model/selectors/selectNewTaskFields";
import { memo } from "react";
import { TaskCardDescription } from "../../task-page-card/parts";

export const TaskCardDescriptionClient = memo(
  function TaskCardDescriptionClient() {
    const description = useSelectNewTaskDescription();
    return (
      <TaskCardDescription
        description={
          description ? (
            description
          ) : (
            <span className="opacity-30">Можете ввести описание</span>
          )
        }
      />
    );
  }
);
