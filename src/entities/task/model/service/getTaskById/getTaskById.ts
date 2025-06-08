"server only";

import { prisma } from "@/shared/lib/db/prisma";
import { TypeTask } from "../../types/task";
import { handleAction } from "@/shared/lib/actions";

const getTaskByIdImplementation = async (
  id: TypeTask["id"]
): Promise<TypeTask | null> => {
  const task = await prisma.task.findUnique({
    where: { id },
    select: {
      id: true,
      deadline: true,
      description: true,
      createdAt: true,
      difficulty: true,
      priority: true,
      updatedAt: true,
      title: true,
      completed: true,
      completeRequest: true,
      author: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          role: true,
          imageUrl: true,
          email: true,
        },
      },
      assignments: {
        select: {
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              imageUrl: true,
              email: true,
            },
          },
        },
      },
    },
  });
  if (!task) {
    // TODO
    throw new Error("Жопа нету таски");
  }
  return { ...task, workers: task.assignments.map(({ user }) => user) };
};
export const getTaskById = async (id: TypeTask["id"]) =>
  handleAction<TypeTask | null, TypeTask["id"]>(getTaskByIdImplementation, id);
