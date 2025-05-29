import { createTask, TaskForm } from "@/entities/task";

export const CreateTaskForm = () => {
  return <TaskForm submit={createTask} />;
};
