"server-only";

import { prisma } from "@/shared/lib/db/prisma";
import { TypeUser } from "../../types/user";
import { handleAction } from "@/shared/lib/actions";

const getUserByEmailImplementation = async (email: TypeUser["email"]) => {
  const data = await prisma.user.findUnique({
    where: { email },
  });
  return data;
};

export const getUserByEmail = (email: TypeUser["email"]) =>
  handleAction(getUserByEmailImplementation, email);
