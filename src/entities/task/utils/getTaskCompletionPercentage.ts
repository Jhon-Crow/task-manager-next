import { TypeTask } from "../public-types";

export const getTaskCompletionPercentage = (task: TypeTask, now: number) => {
  const left = new Date(task.deadline).getTime() - now;
  const fullTime =
    new Date(task.deadline).getTime() - new Date(task.createdAt).getTime();
  return ((fullTime - left) / fullTime) * 100;
};
