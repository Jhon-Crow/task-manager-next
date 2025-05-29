"use client";

import { useSelectNewTaskWorkers } from "@/entities/task/model/selectors/selectNewTaskFields";
import { TaskCardWorkersList } from "../../task-page-card/parts";
import { memo } from "react";

export const TaskCardWorkersListClient = memo(
  function TaskCardWorkersListClient() {
    const workers = useSelectNewTaskWorkers();
    return <TaskCardWorkersList workers={workers} />;
  }
);
