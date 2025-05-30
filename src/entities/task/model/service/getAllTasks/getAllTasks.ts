"server only";

import { prisma } from "@/shared/lib/db/prisma";
import { TypeTask } from "../../types/task";
import { handleAction } from "@/shared/lib/actions";

const getAllTasksImplementation = async (): Promise<TypeTask[]> => {
  const currentDate = new Date();
  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      completed: true,
      deadline: true,
      difficulty: true,
      priority: true,
      updatedAt: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          role: true,
          imageUrl: true,
          email: true,
          createdAt: false,
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

  return tasks.reduce((acc, task) => {
    const isOverdue = task.deadline < currentDate && !task.completed;

    // Обновляем задачу в базе данных, если она просрочена
    if (isOverdue) {
      prisma.task
        .update({
          where: { id: task.id },
          data: { completed: false },
        })
        .catch(console.error); // Обработка ошибок на случай проблем с БД
    }

    acc.push({
      ...task,
      completed: isOverdue ? false : task.completed,
      workers: task.assignments.map(({ user }) => user),
    });
    return acc;
  }, [] as TypeTask[]);
};
export const getAllTasks = async () =>
  handleAction<TypeTask[]>(getAllTasksImplementation);
