"use server";

import { handleAction } from "@/shared/lib/actions";
import { prisma } from "@/shared/lib/db/prisma";

const deleteUserByIdImplementation = async (id: unknown) => {
  if (typeof id !== "string") {
    // TODO
    throw new Error("deleteTask ERROR - id не строка");
  }
  await prisma.user.delete({ where: { id } });
};

export const deleteUserById = async (id: unknown) =>
  handleAction<void, unknown>(deleteUserByIdImplementation, id);
