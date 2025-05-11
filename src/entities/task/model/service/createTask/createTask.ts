"use server";

import { prisma } from "@/shared/lib/db/prisma";
import { taskFormSchema } from "../../validation/schema";
import { handleAction } from "@/shared/lib/actions";

const ADMIN_ID = "4c075b9f-9059-488f-b5e6-dccd57444901";
const createTaskImplementation = async (values: unknown): Promise<void> => {
  const validatedValues = taskFormSchema.safeParse(values);

  if (!validatedValues.success) {
    //TODO
    throw new Error("createTaskValidation жопа");
  }
  const task = validatedValues.data;
  await prisma.task.create({
    data: { ...task, authorId: ADMIN_ID },
  });
};

export const createTask = async (values: unknown) =>
  handleAction<void, unknown>(createTaskImplementation, values);
