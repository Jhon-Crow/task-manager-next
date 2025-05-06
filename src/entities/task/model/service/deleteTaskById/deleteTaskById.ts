"use server";

import { handleAction } from "@/shared/lib/actions";
import { prisma } from "@/shared/lib/db/prisma";

const deleteTaskByIdImplementation = async (id: unknown) => {
  if (typeof id !== "string") {
    // TODO
    throw new Error("deleteTask Жопа");
  }
  await prisma.task.delete({ where: { id } });
};

export const deleteTaskById = async (id: unknown) =>
  handleAction<void, unknown>(deleteTaskByIdImplementation, id);
