"use client";

import {
  TaskForm,
  TaskFormSkeleton,
  useSelectTask,
  useTaskActions,
} from "@/entities/task";
import { updateTask } from "@/entities/task";
import { TypeTask, TypeTaskForm } from "@/entities/task/public-types";
import { useEffect, useMemo } from "react";

export default function UpdateTaskForm({
  authorId,
}: {
  authorId: TypeTask["author"]["id"];
}) {
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
            authorId,
          }
        : undefined,
    [authorId, task]
  );
  useEffect(() => {
    if (!defaultValues) return;
    setNewTask(defaultValues);
  }, [defaultValues, setNewTask]);
  return defaultValues ? (
    <TaskForm
      defaultValues={defaultValues}
      id={task?.id}
      authorId={authorId}
      submit={(values: TypeTaskForm) => updateTask(task?.id, values)}
    />
  ) : (
    <TaskFormSkeleton />
  );
}
