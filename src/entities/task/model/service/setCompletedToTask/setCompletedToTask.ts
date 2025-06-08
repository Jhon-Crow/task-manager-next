"use server";

import { handleAction } from "@/shared/lib/actions";
import { prisma } from "@/shared/lib/db/prisma";
import { Routes } from "@/shared/routes/paths";
import { revalidatePath } from "next/cache";

const setCompletedToTaskImplementation = async (
  id: unknown,
  completed: unknown
) => {
  if (
    typeof id !== "string" ||
    (typeof completed !== "boolean" && typeof completed !== "undefined")
  ) {
    throw new Error("Некорректный тип данных");
  }
  await prisma.task.update({
    where: { id },
    data: {
      completed,
      completeRequest: false,
    },
  });
  revalidatePath(Routes.TASK(id));
};

export const setCompletedToTask = async (id: unknown, completed: unknown) =>
  handleAction(setCompletedToTaskImplementation, id, completed);
