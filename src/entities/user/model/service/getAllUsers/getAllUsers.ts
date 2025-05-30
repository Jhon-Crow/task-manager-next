"server only";

import { prisma } from "@/shared/lib/db/prisma";
import { TypeUser } from "../../types/user";
import { handleAction } from "@/shared/lib/actions";

const getAllUsersImplementation = async (): Promise<TypeUser[]> => {
  const users = await prisma.user.findMany({ omit: { password: true } });
  return users;
};

export const getAllUsers = async () =>
  handleAction<TypeUser[]>(getAllUsersImplementation);
