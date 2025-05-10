"use client";

import { memo } from "react";
import { TaskCardDifficulty } from "../../task-page-card/parts";
import { useSelectNewTaskDifficulty } from "@/entities/task/model/selectors/selectNewTaskFields";

export const TaskCardDifficultyClient = memo(
  function TaskCardDifficultyClient() {
    const difficulty = useSelectNewTaskDifficulty();
    return <TaskCardDifficulty difficulty={difficulty || null} />;
  }
);
