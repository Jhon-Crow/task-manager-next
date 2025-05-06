import { createTask, TaskForm } from "@/entities/task";

export const AddTaskForm = () => {
  return <TaskForm submit={createTask} />;
};
