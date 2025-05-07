"use client";

import { NewTaskContext } from "@/shared/contexts";
import { TypeTask, TypeTaskForm } from "../public-types";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { calucateDaysDiff } from "@/shared/lib/utils/calculateDays/calculateDats";

export const NewTaskProvider = ({
  children,
  task,
}: {
  task?: TypeTask;
  children: Readonly<ReactNode>;
}) => {
  const [newTask, setTask] = useState<TypeTaskForm>(
    task
      ? {
          deadline: calucateDaysDiff(task.deadline, task.createdAt),
          title: task.title || "",
          description: task.description || "",
          difficulty: task.difficulty || undefined,
          priority: task.priority || undefined,
        }
      : ({} as TypeTaskForm)
  );
  const handleSetTask = useCallback((values: Partial<TypeTaskForm>) => {
    setTask((prev) => ({ ...prev, ...values }));
  }, []);

  const value = useMemo(
    () => ({ newTask, setNewTask: handleSetTask }),
    [handleSetTask, newTask]
  );
  return <NewTaskContext value={value}>{children}</NewTaskContext>;
};
