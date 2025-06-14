import {
    Difficulty,
    Priority,
    PrismaClient,
    Role,
    Assignment,
} from "@/shared/lib/db/generated";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.assignment.deleteMany();
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();

    // Create admins (2)
    const admins = await Promise.all(
        Array.from({ length: 2 }, (_, i) => i + 1).map(async (num) => {
            return prisma.user.create({
                data: {
                    firstname: `Admin`,
                    lastname: `${num}`,
                    email: `admin${num}@example.com`,
                    password: await hash("admin123", 10),
                    role: Role.ADMIN,
                    imageUrl: `https://example.com/admin${num}.jpg`,
                },
            });
        })
    );

    // Create managers (4)
    const managers = await Promise.all(
        Array.from({ length: 4 }, (_, i) => i + 1).map(async (num) => {
            return prisma.user.create({
                data: {
                    firstname: `Manager`,
                    lastname: `${num}`,
                    email: `manager${num}@example.com`,
                    password: await hash("manager123", 10),
                    role: Role.MANAGER,
                    imageUrl: `https://example.com/manager${num}.jpg`,
                },
            });
        })
    );

    // Create workers (20)
    const workers = await Promise.all(
        Array.from({ length: 20 }, (_, i) => i + 1).map(async (num) => {
            return prisma.user.create({
                data: {
                    firstname: `Worker`,
                    lastname: `${num}`,
                    email: `worker${num}@example.com`,
                    password: await hash("worker123", 10),
                    role: Role.WORKER,
                    imageUrl: `https://example.com/worker${num}.jpg`,
                },
            });
        })
    );

    // Base task titles
    const baseTaskTitles = [
        "Implement user authentication",
        "Design database schema",
        "Create API endpoints",
        "Build frontend components",
        "Write unit tests",
        "Optimize performance",
        "Fix critical bugs",
        "Implement payment system",
        "Design UI/UX",
        "Setup CI/CD pipeline",
        "Write documentation",
        "Conduct security audit",
        "Add analytics tracking",
        "Implement search functionality",
        "Create admin dashboard",
        "Build mobile responsive design",
        "Integrate third-party API",
        "Refactor legacy code",
        "Setup monitoring",
        "Plan sprint tasks",
    ];

    // Generate 1000 tasks
    const tasks = [];
    const allAuthors = [...admins, ...managers]; // 6 authors (2 admins + 4 managers)

    for (let i = 0; i < 1000; i++) {
        const titleIndex = i % baseTaskTitles.length;
        const title = `${baseTaskTitles[titleIndex]} #${Math.floor(i / baseTaskTitles.length) + 1}`;

        const author = allAuthors[Math.floor(Math.random() * allAuthors.length)];

        const priority = [Priority.LOW, Priority.AVERAGE, Priority.HIGH][
            Math.floor(Math.random() * 3)
            ];

        const difficulty = [Difficulty.EASY, Difficulty.MIDDLE, Difficulty.HARD][
            Math.floor(Math.random() * 3)
            ];

        const deadline = new Date();
        deadline.setDate(deadline.getDate() + Math.floor(Math.random() * 30) + 1);

        // Completion logic: 20% completed, 10% not completed, 70% undefined
        const rand = Math.random();
        const completed = rand > 0.8 ? true : rand > 0.9 ? false : undefined;

        const task = await prisma.task.create({
            data: {
                title,
                description: `Detailed description for task: ${title}. This includes all requirements and specifications needed for implementation.`,
                priority,
                difficulty,
                completed,
                authorId: author.id,
                deadline,
            },
        });

        tasks.push(task);
    }

    // Create assignments
    const assignments: Assignment[] = [];

    // Phase 1: Assign 5-8 tasks per worker
    for (const worker of workers) {
        const tasksToAssign = Math.floor(Math.random() * 4) + 5; // 5-8 tasks
        const shuffledTasks = [...tasks].sort(() => 0.5 - Math.random());

        for (let i = 0; i < tasksToAssign; i++) {
            const task = shuffledTasks[i];
            if (!assignments.some(a => a.userId === worker.id && a.taskId === task.id)) {
                assignments.push({
                    userId: worker.id,
                    taskId: task.id,
                });
            }
        }
    }

    // Phase 2: Add 1-2 workers to tasks
    const multiWorkerTasks = [...tasks]

    for (const task of multiWorkerTasks) {
        const additionalWorkers = Math.floor(Math.random() * 2) + 10;
        const shuffledWorkers = [...workers].sort(() => 0.5 - Math.random());

        let assigned = 0;
        for (const worker of shuffledWorkers) {
            if (assigned >= additionalWorkers) break;

            if (!assignments.some(a =>
                a.userId === worker.id &&
                a.taskId === task.id
            )) {
                assignments.push({
                    userId: worker.id,
                    taskId: task.id,
                });
                assigned++;
            }
        }
    }

    // Create assignments in database
    await prisma.assignment.createMany({
        data: assignments,
    });

    console.log("Database seeded successfully!");
    console.log(`Created: 
  - ${admins.length} admins
  - ${managers.length} managers
  - ${workers.length} workers
  - ${tasks.length} tasks
  - ${assignments.length} assignments`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });