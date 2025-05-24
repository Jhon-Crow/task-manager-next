"server-only";

import { checkAuth } from "@/entities/auth";
import { TypeTaskWorker } from "@/entities/task/public-types";
import { handleAction } from "@/shared/lib/actions";
import { prisma } from "@/shared/lib/db/prisma";

const getAllWorkersImplementation = async (): Promise<TypeTaskWorker[]> => {
  const session = await checkAuth();
  if (session.user.role !== "ADMIN" && session.user.role !== "MANAGER") {
    throw new Error("Не имеете право получать список работник");
  }

  const workers = await prisma.user.findMany({
    where: {
      role: "WORKER",
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      imageUrl: true,
      email: true,
      _count: {
        select: {
          tasks: true,
        },
      },
    },
  });

  return workers.map(({ _count, ...worker }) => ({
    ...worker,
    tasksCount: _count.tasks,
  }));
};

export const getAllWorkers = async () =>
  handleAction(getAllWorkersImplementation);
