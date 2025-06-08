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
      reviews: {
        select: {
          id: true,
          text: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              role: true,
              imageUrl: true,
              email: true,
            }
          }
        }
      },
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
              role: true,
              imageUrl: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!task) {
    throw new Error("getTaskById - Задача не найдена");
  }

  return {
    ...task,
    workers: task.assignments.map(({ user }) => user)
  };
};

export const getTaskById = async (id: TypeTask["id"]) =>
    handleAction<TypeTask | null, TypeTask["id"]>(getTaskByIdImplementation, id);