"use server";

import { prisma } from "@/shared/lib/db/prisma";
import { taskFormSchema } from "../../validation/schema";
import { handleAction } from "@/shared/lib/actions";
import { setMskTimeEnd } from "@/shared/lib/utils";
import { revalidatePath } from "next/cache";
import { Routes } from "@/shared/routes/paths";

const createTaskImplementation = async (values: unknown): Promise<void> => {
  const validatedValues = taskFormSchema.safeParse(values);
  if (!validatedValues.success) {
    //TODO
    throw new Error("createTaskValidation " + validatedValues.error);
  }

  const { workersId, ...task } = validatedValues.data;
  const newDates = setMskTimeEnd(task.deadline);
  const newTask = await prisma.task.create({
    data: { ...task, deadline: newDates },
  });
  for (const id of workersId) {
    await prisma.assignment.create({
      data: {
        task: { connect: { id: newTask.id } },
        user: { connect: { id } },
      },
    });
  }
  revalidatePath(Routes.TASKS_LIST);
};

export const createTask = async (values: unknown) =>
  handleAction<void, unknown>(createTaskImplementation, values);
