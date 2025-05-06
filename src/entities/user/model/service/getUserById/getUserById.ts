"server only";
import {TypeUser} from "../../types/user";
import { prisma } from "@/shared/lib/db/prisma";

export const getUserById = async (
  id: TypeUser["id"]
): Promise<TypeUser | string | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (e) {
    console.log(e);

    return "Непредвиденная ошибка";
  }
};
