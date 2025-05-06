"server only";

import { prisma } from "@/shared/lib/db/prisma";
import { TypeUser } from "../../types/user";

export const getAllUsers = async (): Promise<TypeUser[] | string> => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (e) {
    console.log(e);
    return "Непредвиденная ошибка";
  }
};
