"use server";

import { Routes } from "@/shared/consts/paths";
import { handleAction } from "@/shared/lib/actions";
import { prisma } from "@/shared/lib/db/prisma";
import { revalidatePath } from "next/cache";

const deleteTaskByIdImplementation = async (id: unknown) => {
  if (typeof id !== "string") {
    // TODO
    throw new Error("deleteTask Жопа");
  }

  await prisma.task.delete({ where: { id } });
  revalidatePath(Routes.TASKS_LIST);
};

export const deleteTaskById = async (id: unknown) =>
  handleAction<void, unknown>(deleteTaskByIdImplementation, id);
