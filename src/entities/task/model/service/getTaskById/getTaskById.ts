"server only";

import { prisma } from "@/shared/lib/db/prisma";
import { TypeTask } from "../../types/task";

export const getTaskById = async (
  id: TypeTask["id"]
): Promise<TypeTask | string | null> => {
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    return task;
  } catch (e) {
    console.log(e);

    return "Непредвиденная ошибка";
  }
};
