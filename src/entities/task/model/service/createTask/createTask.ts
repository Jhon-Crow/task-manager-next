"use server";

import { prisma } from "@/shared/lib/db/prisma";
import { taskFormSchema } from "../../validation/schema";
import { handleAction } from "@/shared/lib/actions";
import { setMskTimeEnd } from "@/shared/lib/utils";

const createTaskImplementation = async (values: unknown): Promise<void> => {
  const validatedValues = taskFormSchema.safeParse(values);

  if (!validatedValues.success) {
    //TODO
    throw new Error("createTaskValidation жопа");
  }
  const task = validatedValues.data;
  const newDates = setMskTimeEnd(task.deadline);
  await prisma.task.create({
    data: { ...task, deadline: newDates },
  });
};

export const createTask = async (values: unknown) =>
  handleAction<void, unknown>(createTaskImplementation, values);
