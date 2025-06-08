"use server";

import { prisma } from "@/shared/lib/db/prisma";
import { taskFormSchema } from "../../validation/schema";
import { getTaskById } from "../getTaskById/getTaskById";
import { handleAction } from "@/shared/lib/actions";
import { revalidatePath } from "next/cache";
import { Routes } from "@/shared/routes/paths";

const updateTaskImplementation = async (id: unknown, values: unknown) => {
  const validatedValues = taskFormSchema.safeParse(values);

  if (!validatedValues.success || !id || !(typeof id === "string")) {
    // TODO
    throw new Error("updateTask жопа");
  }
  const oldTaskData = await getTaskById(id);
  if (!oldTaskData.success || !oldTaskData.data) {
    throw new Error("TODO");
  }
  const { workersId, ...task } = validatedValues.data;
  await prisma.task.update({
    where: { id },
    data: { ...task, completed: null },
  });
  await prisma.assignment.deleteMany({ where: { task: { id } } });
  for (const workerId of workersId) {
    await prisma.assignment.create({
      data: {
        task: { connect: { id } },
        user: { connect: { id: workerId } },
      },
    });
  }
  revalidatePath(Routes.TASKS_LIST);
};

export const updateTask = async (id: unknown, values: unknown) =>
  handleAction(updateTaskImplementation, id, values);
