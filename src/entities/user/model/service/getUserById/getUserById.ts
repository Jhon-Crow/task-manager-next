"use server";
import { handleAction } from "@/shared/lib/actions";
import { TypeUser, TypeUserReceivedByID } from "../../types/user";
import { prisma } from "@/shared/lib/db/prisma";
import { TypeTask } from "@/entities/task/public-types";

const getUserByIdImplementation = async (
  id: TypeUser["id"]
): Promise<TypeUserReceivedByID | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      tasks: { include: { task: true } },
    },
    omit: {
      password: true,
    },
  });
  if (!user) {
    return null;
  }

  return {
    ...user,
    tasks: user.tasks.reduce((acc, { task }) => {
      return [...acc, { ...task, author: user }];
    }, [] as TypeTask[]),
  };
};

export const getUserById = async (id: TypeUser["id"]) =>
  handleAction(getUserByIdImplementation, id);
