"use server";

import { handleAction } from "@/shared/lib/actions";
import { prisma } from "@/shared/lib/db/prisma";
import { Routes } from "@/shared/routes/paths";
import { revalidatePath } from "next/cache";

const setCompleteRequestToTaskImplementation = async (
  id: unknown,
  review: unknown,
  userId: unknown
) => {
  if (
    typeof id !== "string" ||
    typeof review !== "string" ||
    typeof userId !== "string"
  ) {
    throw new Error("Некорректный тип данных");
  }
  await prisma.task.update({
    where: { id },
    data: {
      completeRequest: true,
    },
  });

  await prisma.review.create({
    data: {
      text: review,
      userId,
      taskId: id,
    },
  });
  revalidatePath(Routes.TASK(id));
};

export const setCompleteRequestToTask = async (
  id: unknown,
  review: unknown,
  userId: unknown
) => handleAction(setCompleteRequestToTaskImplementation, id, review, userId);
