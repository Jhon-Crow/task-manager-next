import { checkAuth } from "@/entities/auth";
import { createTask, TaskForm } from "@/entities/task";
import { TypeTask } from "@/entities/task/public-types";

export const CreateTaskForm = ({
  authorId,
}: {
  authorId: TypeTask["authorId"];
}) => {
  return <TaskForm submit={createTask} authorId={authorId} />;
};
