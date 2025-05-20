"use server";

import { prisma } from "@/shared/lib/db/prisma";
import { handleAction } from "@/shared/lib/actions";
import { userUpdateFormSchema } from "../../validation/schema";
import { checkAuth } from "@/entities/auth";
import { Role } from "@/shared/lib/db/generated";

const updateUserImplementation = async (values: unknown, id: unknown) => {
  const session = await checkAuth();
  if (!session || session.user.role !== Role.ADMIN) {
    // TODO
    throw new Error("У вас нету прав");
  }
  const validatedValues = userUpdateFormSchema.safeParse(values);

  if (!validatedValues.success || !id || !(typeof id === "string")) {
    // TODO
    throw new Error("updateUser Error " + validatedValues.error);
  }

  const user = validatedValues.data;
  await prisma.user.update({ where: { id }, data: { ...user } });
};

export const updateUser = async (values: unknown, id: unknown) =>
  handleAction(updateUserImplementation, values, id);
