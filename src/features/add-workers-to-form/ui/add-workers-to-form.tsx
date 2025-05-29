"use client";

import { useTaskActions } from "@/entities/task";
import { useSelectWorkersIdInTask } from "@/entities/task/model/selectors/selectTask";
import { TypeTaskWorker } from "@/entities/task/public-types";
import { UsersDataTable } from "@/entities/user";
import { useEffect } from "react";

export function AddWorkersToForm({
  workers,
  className,
}: {
  workers: TypeTaskWorker[];
  className?: string;
}) {
  const { setWorkers, setNewTaskWorkers } = useTaskActions();
  const defaultWorkersId = useSelectWorkersIdInTask();
  useEffect(() => {
    setWorkers(workers);
  }, [setWorkers, workers]);

  return (
    <UsersDataTable
      workersId={defaultWorkersId}
      className={className}
      data={workers}
      setSelectedWorker={setNewTaskWorkers}
    />
  );
}
