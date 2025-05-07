"use client";

import { TypeTask } from "@/entities/task/public-types";
import { TaskContext } from "@/shared/contexts";
import { ReactNode, useMemo } from "react";

export const TaskProvider = ({
  children,
  task,
}: {
  children: ReactNode;
  task?: TypeTask;
}) => {
  const value = useMemo(
    () => ({
      task: task || ({} as TypeTask),
    }),
    [task]
  );
  return <TaskContext value={value}>{children}</TaskContext>;
};
