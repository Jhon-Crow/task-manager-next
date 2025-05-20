"server only";

import { prisma } from "@/shared/lib/db/prisma";
import { TypeUser } from "../../types/user";
import { handleAction } from "@/shared/lib/actions";
import { sleep } from "@/shared/lib/utils";

const getAllUsersImplementation = async (): Promise<TypeUser[]> => {
  const users = await prisma.user.findMany({ omit: { password: true } });
  await sleep(10);
  return users;
};

export const getAllUsers = async () =>
  handleAction<TypeUser[]>(getAllUsersImplementation);
