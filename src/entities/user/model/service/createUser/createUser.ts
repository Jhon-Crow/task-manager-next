"use server";

import {prisma} from "@/shared/lib/db/prisma";
import {userFormSchema, userFormServerSchema} from "../../validation/schema";
import {handleAction} from "@/shared/lib/actions";

const ADMIN_ID = "66860640-5e1e-438b-8c9b-98757b4607dc";
const createTaskImplementation = async (values: unknown): Promise<void> => {
  const validatedValues = userFormServerSchema.safeParse(values);
  // const validatedValues = userFormSchema.safeParse(values);
  if (!validatedValues.success) {
    //TODO
    throw new Error("createUserValidation ERROR!!!" + validatedValues.error);
  }
  const user = validatedValues.data;
  await prisma.user.create({
    data: { ...user },
  });
};

export const createUser = async (values: unknown) =>
  handleAction<void, unknown>(createTaskImplementation, values);
