"server only";

import { prisma } from "@/shared/lib/db/prisma";
import { TypeTask } from "../../types/task";

export const getAllTasks = async (): Promise<TypeTask[] | string> => {
  try {
    const tasks = await prisma.task.findMany();
    return tasks;
  } catch (e) {
    console.log(e);
    return "Непредвиденная ошибка";
  }
};
