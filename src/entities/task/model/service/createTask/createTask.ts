"use server";

import { prisma } from "@/shared/lib/db/prisma";
import { taskFormSchema } from "../../validation/schema";
import { addDays } from "@/shared/lib/utils";
import { handleAction } from "@/shared/lib/actions";

const ADMIN_ID = "66860640-5e1e-438b-8c9b-98757b4607dc";
const createTaskImplementation = async (values: unknown): Promise<void> => {
  const validatedValues = taskFormSchema.safeParse(values);
  if (!validatedValues.success) {
    //TODO
    throw new Error("createTaskValidation жопа");
  }
  const task = validatedValues.data;
  const deadline = addDays(task.deadline);
  await prisma.task.create({
    data: { ...task, deadline, authorId: ADMIN_ID },
  });
};

export const createTask = async (values: unknown) =>
  handleAction<void, unknown>(createTaskImplementation, values);
