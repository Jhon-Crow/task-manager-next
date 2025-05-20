"use server";

import { prisma } from "@/shared/lib/db/prisma";
// import { taskFormSchema } from "../../validation/schema";
import { addDays, sleep } from "@/shared/lib/utils";
// import { getTaskById } from "../getTaskById/getTaskById";
import { handleAction } from "@/shared/lib/actions";
import {
  userFormSchema,
  userFormServerSchema,
  userFormUpdateServerSchema
} from "@/entities/user/model/validation/schema";
import {getTaskById} from "@/entities/task";
import {getUserById} from "@/entities/user";

const updateUserImplementation = async (id: unknown, values: unknown) => {
  const validatedValues = userFormUpdateServerSchema.safeParse(values);

  if (!validatedValues.success || !id || !(typeof id === "string")) {
    throw new Error("updateUser Error " + validatedValues.error);
  }
  const getUserByIdData = await getUserById(id);
  if (!getUserByIdData.success || !getUserByIdData.data) {
    throw new Error("UpdateUser error! Не удаётся получить исходного пользователя ");
  }
  const user = validatedValues.data;
  await prisma.user.update({ where: { id }, data: { ...user } });
};
// const updateUserPasswordImplementation = async (id: unknown, values: unknown) => {
//   const validatedValues = userFormUpdateServerSchema.safeParse(values);
//
//   if (!validatedValues.success || !id || !(typeof id === "string")) {
//     throw new Error("updateUser Error " + validatedValues.error);
//   }
//   const getUserByIdData = await getUserById(id);
//   if (!getUserByIdData.success || !getUserByIdData.data) {
//     throw new Error("UpdateUser error! Не удаётся получить исходного пользователя ");
//   }
//   const user = validatedValues.data;
//   await prisma.user.update({ where: { id }, data: { ...user } });
// };

export const updateUser = async (id: unknown, values: unknown) =>
  handleAction(updateUserImplementation, id, values);
// export const updateUserPassword = async (id: unknown, values: unknown) =>
//   handleAction(updateUserPasswordImplementation, id, values);
