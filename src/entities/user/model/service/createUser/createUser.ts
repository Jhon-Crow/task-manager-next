"use server";

import { prisma } from "@/shared/lib/db/prisma";
import { userCreateFormServerSchema } from "../../validation/schema";
import { handleAction } from "@/shared/lib/actions";
import { checkAuth } from "@/entities/auth";
import { Role } from "@/shared/lib/db/generated";
import bcrypt from "bcryptjs";

const createUserImplementation = async (values: unknown): Promise<void> => {
  const session = await checkAuth();
  if (!session || session.user.role !== Role.ADMIN) {
    // TODO
    throw new Error("У вас нет прав");
  }
  const validatedValues = userCreateFormServerSchema.safeParse(values);
  if (!validatedValues.success) {
    //TODO
    throw new Error("createUserValidation ERROR!!!" + validatedValues.error);
  }
  const { password, ...user } = validatedValues.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { ...user, password: hashedPassword },
  });
};

export const createUser = async (values: unknown) =>
  handleAction<void, unknown[]>(createUserImplementation, values);
