"server only";

import { prisma } from "@/shared/lib/db/prisma";
import { TypeTask } from "../../types/task";
import { handleAction } from "@/shared/lib/actions";

const getAllTasksImplementation = async (): Promise<TypeTask[]> => {
  const tasks = await prisma.task.findMany();
  return tasks;
};

export const getAllTasks = async () =>
  handleAction<TypeTask[]>(getAllTasksImplementation);
