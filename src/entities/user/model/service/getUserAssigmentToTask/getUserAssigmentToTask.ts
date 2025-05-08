import { TypeTask } from "@/entities/task/public-types";
import { handleAction } from "@/shared/lib/actions";
import { prisma } from "@/shared/lib/db/prisma";

const getUsersAssignedToTaskImplementation = async (taskId: TypeTask["id"]) => {
  const assignedUsers = await prisma.user.findMany({
    where: {
      tasks: {
        some: {
          taskId: taskId,
        },
      },
      id: {
        not: (
          await prisma.task.findUnique({
            where: { id: taskId },
            select: { authorId: true },
          })
        )?.authorId,
      },
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      imageUrl: true,
    },
  });

  return assignedUsers;
};

export const getUsersAssignedToTask = async (taskId: TypeTask["id"]) =>
  handleAction<
    Awaited<ReturnType<typeof getUsersAssignedToTaskImplementation>>,
    TypeTask["id"]
  >(getUsersAssignedToTaskImplementation, taskId);
