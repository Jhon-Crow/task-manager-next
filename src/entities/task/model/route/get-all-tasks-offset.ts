import {prisma} from "@/shared/lib/db/prisma";
import {NextRequest, NextResponse} from "next/server";

export const dynamic = "force-dynamic";

export async function getAllTasksOffset(req: NextRequest) {
    const { searchParams } = new URL(req.url || "");
    const page = parseInt(searchParams.get("page") || "1") || 1;
    const pageSize = 10;
    const title = searchParams.get("query");
    const sortMap = {
        'completed': { sortBy: 'completed', sortOrder: 'desc' } as const,
        '-completed': { sortBy: 'completed', sortOrder: 'asc' } as const,
        'title': { sortBy: 'title', sortOrder: 'asc' } as const,
        '-title': { sortBy: 'title', sortOrder: 'desc' } as const,
        'createdAt': { sortBy: 'createdAt', sortOrder: 'asc' } as const,
        '-createdAt': { sortBy: 'createdAt', sortOrder: 'desc' } as const
    } as const;
    const sorting = searchParams.get("sorting") as ( keyof typeof sortMap);
    const {sortBy, sortOrder} = sortMap[sorting] ? sortMap[sorting] : {
        sortBy: 'createdAt',
        sortOrder: 'asc'
    };

    try {
        const where = {
            ...(title && { title: { contains: title } }),
            // ...(completed && { completed: completed === "true" }), //фильтрация по комплитэд тру
        };

        const totalTasks = await prisma.task.count({ where });

        const skip = (page - 1) * pageSize;

        const tasks = await prisma.task.findMany({
            where,
            skip, // Пропускаем предыдущие страницы
            take: pageSize,
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
            orderBy: {
                [sortBy]: sortOrder,
            },
        });

        const totalPages = Math.ceil(totalTasks / pageSize);

        return NextResponse.json(
            {
                tasks: tasks.map(task => ({
                    ...task,
                    workers: task.assignments.map(({ user }) => user),
                    assignments: undefined,
                })),
                totalTasks,
                totalPages,
                currentPage: page,
                pageSize,

            },
            {
                status: 200,
                headers: {
                    "Content-type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Failed to fetch tasks:", error);
        return NextResponse.json(
            { error: "Failed to fetch tasks" },
            { status: 500 }
        );
    }
}
