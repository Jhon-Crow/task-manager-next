"use client";

import { TaskPageCard } from "@/entities/task";
import { useNewTaskContext } from "@/shared/hooks/useNewTaskContext";
import { useTaskContext } from "@/shared/hooks/useTaskContext";
import { TaskFormWidget } from "@/widgets/task-form-widget";

export default function TaskUpdatePage() {
  const { newTask } = useNewTaskContext();

  const { task } = useTaskContext();
  return (
    <div className="flex gap-x-12 mx-auto max-w-[1200px] items-start mt-6">
      <TaskPageCard
        task={{ ...task, ...newTask, deadline: task.deadline }}
        className="flex-1 mt-12"
      />
      <TaskFormWidget type="update" />
    </div>
  );
}
