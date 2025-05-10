"server only";
import { handleAction } from "@/shared/lib/actions";
import { TypeUser } from "../../types/user";
import { prisma } from "@/shared/lib/db/prisma";

const getUserByIdImplementation = async (
  id: TypeUser["id"]
): Promise<TypeUser | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      tasks: { include: { task: true } },
    },
  });
  return user;
};

export const getUserById = async (id: TypeUser["id"]) =>
  handleAction(getUserByIdImplementation, id);
