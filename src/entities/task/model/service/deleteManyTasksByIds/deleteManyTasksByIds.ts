"use server";

import { Routes } from "@/shared/routes/paths";
import { handleAction } from "@/shared/lib/actions";
import { prisma } from "@/shared/lib/db/prisma";
import { sleep } from "@/shared/lib/utils";
import { revalidatePath } from "next/cache";

const deleteManyTasksByIdsImplementation = async (ids: unknown) => {
  if (!Array.isArray(ids) || ids.some(id => typeof id !== "string")) {
    // TODO
    throw new Error("Некорректный массив: ожидается массив строк IDs");
  }
  if (ids.length === 0) return;

  await sleep(10);

  await prisma.task.deleteMany({
    where: {
      id: { in: ids }
    }
  });

  revalidatePath(Routes.TASKS_LIST);
};

export const deleteManyTasksByIds = async (ids: unknown) =>
    handleAction<void, unknown>(deleteManyTasksByIdsImplementation, ids);