"use server";

import { prisma } from "@/shared/lib/db/prisma";
import { taskFormSchema } from "../../validation/schema";
import { getTaskById } from "../getTaskById/getTaskById";
import { handleAction } from "@/shared/lib/actions";

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
  const task = validatedValues.data;
  await prisma.task.update({ where: { id }, data: task });
};

export const updateTask = async (id: unknown, values: unknown) =>
  handleAction(updateTaskImplementation, id, values);
