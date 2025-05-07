"use server";

import { prisma } from "@/shared/lib/db/prisma";
import { taskFormSchema } from "../../validation/schema";
import { addDays, sleep } from "@/shared/lib/utils";
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
  await sleep(5);
  const oldTask = oldTaskData.data;
  const task = validatedValues.data;
  const deadline = addDays(task.deadline, oldTask.createdAt);
  await prisma.task.update({ where: { id }, data: { ...task, deadline } });
};

export const updateTask = async (id: unknown, values: unknown) =>
  handleAction(updateTaskImplementation, id, values);
