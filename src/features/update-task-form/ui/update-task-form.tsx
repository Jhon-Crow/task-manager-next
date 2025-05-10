"use client";

import { TaskForm, useSelectTask, useTaskActions } from "@/entities/task";
import { updateTask } from "@/entities/task/model/service/updateTask/updateTask";
import { TypeTaskForm } from "@/entities/task/public-types";
import { useEffect, useMemo } from "react";

export default function UpdateTaskForm() {
  const task = useSelectTask();
  const { setNewTask } = useTaskActions();

  const defaultValues = useMemo(
    () => ({
      deadline: new Date(task?.deadline || new Date()),
      title: task?.title || "",
      description: task?.description || "",
      difficulty: task?.difficulty || undefined,
      priority: task?.priority || undefined,
    }),
    [
      task?.deadline,
      task?.description,
      task?.difficulty,
      task?.priority,
      task?.title,
    ]
  );
  useEffect(() => {
    setNewTask({
      ...defaultValues,
      deadline: defaultValues.deadline.getTime(),
    });
  }, [defaultValues, setNewTask]);
  return (
    <TaskForm
      defaultValues={defaultValues}
      id={task?.id}
      submit={(values: TypeTaskForm) => updateTask(task?.id, values)}
    />
  );
}
