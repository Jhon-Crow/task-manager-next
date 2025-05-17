"use server";

import { prisma } from "@/shared/lib/db/prisma";
// import { taskFormSchema } from "../../validation/schema";
import { addDays, sleep } from "@/shared/lib/utils";
// import { getTaskById } from "../getTaskById/getTaskById";
import { handleAction } from "@/shared/lib/actions";
import {userFormSchema, userFormServerSchema} from "@/entities/user/model/validation/schema";
import {getTaskById} from "@/entities/task";

const updateUserImplementation = async (id: unknown, values: unknown) => {
  const validatedValues = userFormServerSchema.safeParse(values);

  if (!validatedValues.success || !id || !(typeof id === "string")) {
    throw new Error("updateUser Error " + validatedValues.error);
  }
  // const oldTaskData = await getTaskById(id);
  // if (!oldTaskData.success || !oldTaskData.data) {
  //   throw new Error("TODO");
  // }
  // await sleep(5);
  // const oldTask = oldTaskData.data;
  const user = validatedValues.data;
  // const deadline = addDays(task.deadline, oldTask.createdAt);
  await prisma.user.update({ where: { id }, data: { ...user } });
};

export const updateUser = async (id: unknown, values: unknown) =>
  handleAction(updateUserImplementation, id, values);
