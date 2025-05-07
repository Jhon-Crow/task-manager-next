"server only";

import { prisma } from "@/shared/lib/db/prisma";
import { TypeTask } from "../../types/task";
import { handleAction } from "@/shared/lib/actions";

const getTaskByIdImplementation = async (
  id: TypeTask["id"]
): Promise<TypeTask | null> => {
  const task = await prisma.task.findUnique({ where: { id } });
  return task;
};
export const getTaskById = async (id: TypeTask["id"]) =>
  handleAction<TypeTask | null, TypeTask["id"]>(getTaskByIdImplementation, id);
