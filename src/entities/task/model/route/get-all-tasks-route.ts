import { TypeTask } from "@/entities/task/public-types";
import { prisma } from "@/shared/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function getAllTasksRoute(req: NextRequest) {
  const { searchParams } = new URL(req.url || "");
  const cursor = searchParams.get("cursor");
  const pageSize = parseInt(searchParams.get("pageSize") || "0") || 20;
  const title = searchParams.get("title");
  const completed = searchParams.get("completed");

  try {
    const where = {
      ...(title && { title: { contains: title } }),
      ...(completed && { completed: completed === "true" }),
    };
    const tasks = await prisma.task.findMany({
      where,
      take: pageSize + 1, // Берем на 1 больше для проверки наличия следующей страницы
      ...(cursor && {
        cursor: {
          id: cursor,
        },
      }),
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
        completeRequest: true,
        deadline: true,
        difficulty: true,
        priority: true,
        updatedAt: true,
        createdAt: true,
        completeRequest: true,
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
      orderBy: {
        createdAt: "desc",
      },
    });
    const hasNextPage = tasks.length > pageSize;
    const filteredTasks = hasNextPage ? tasks.slice(0, -1) : tasks;
    const nextCursor = hasNextPage ? tasks[tasks.length - 1].id : null;

    return NextResponse.json(
      {
        tasks: filteredTasks.reduce((acc, task) => {
          acc.push({
            ...task,
            workers: task.assignments.map(({ user }) => user),
          });
          return acc;
        }, [] as Omit<TypeTask, "reviews">[]),
        nextCursor,
      },
      {
        status: 200,
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
