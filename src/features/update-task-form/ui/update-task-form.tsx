"use client";

import {
  TaskForm,
  TaskFormSkeleton,
  useSelectTask,
  useTaskActions,
} from "@/entities/task";
import { updateTask } from "@/entities/task/model/service/updateTask/updateTask";
import { TypeTaskForm } from "@/entities/task/public-types";
import { useEffect, useMemo } from "react";

export default function UpdateTaskForm() {
  const task = useSelectTask();
  const { setNewTask } = useTaskActions();

  const defaultValues = useMemo(
    () =>
      task
        ? {
            deadline: new Date(task?.deadline || new Date()),
            title: task?.title || "",
            description: task?.description || "",
            difficulty: task?.difficulty || undefined,
            priority: task?.priority || undefined,
          }
        : undefined,
    [task]
  );
  useEffect(() => {
    if (!defaultValues) return;
    setNewTask(defaultValues);
  }, [defaultValues, setNewTask]);
  return defaultValues ? (
    <TaskForm
      defaultValues={defaultValues}
      id={task?.id}
      submit={(values: TypeTaskForm) => updateTask(task?.id, values)}
    />
  ) : (
    <TaskFormSkeleton />
  );
}
