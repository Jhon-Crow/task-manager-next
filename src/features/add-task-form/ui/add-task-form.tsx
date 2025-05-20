import { checkAuth } from "@/entities/auth";
import { createTask, TaskForm } from "@/entities/task";

export const CreateTaskForm = async () => {
  const session = await checkAuth();
  return <TaskForm submit={createTask} authorId={session.user.id} />;
};
