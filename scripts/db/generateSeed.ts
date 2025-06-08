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

  // Create users
  const admin = await prisma.user.create({
    data: {
      firstname: "Admin",
      lastname: "User",
      email: "admin@example.com",
      password: await hash("admin123", 10),
      role: Role.ADMIN,
      imageUrl: "https://example.com/admin.jpg",
    },
  });

  const managers = await Promise.all([
    prisma.user.create({
      data: {
        firstname: "Manager",
        lastname: "One",
        email: "manager1@example.com",
        password: await hash("manager123", 10),
        role: Role.MANAGER,
        imageUrl: "https://example.com/manager1.jpg",
      },
    }),
    prisma.user.create({
      data: {
        firstname: "Manager",
        lastname: "Two",
        email: "manager2@example.com",
        password: await hash("manager123", 10),
        role: Role.MANAGER,
        imageUrl: "https://example.com/manager2.jpg",
      },
    }),
  ]);

  const workers = await Promise.all([
    prisma.user.create({
      data: {
        firstname: "Worker",
        lastname: "One",
        email: "worker1@example.com",
        password: await hash("worker123", 10),
        role: Role.WORKER,
        imageUrl: "https://example.com/worker1.jpg",
      },
    }),
    prisma.user.create({
      data: {
        firstname: "Worker",
        lastname: "Two",
        email: "worker2@example.com",
        password: await hash("worker123", 10),
        role: Role.WORKER,
        imageUrl: "https://example.com/worker2.jpg",
      },
    }),
    prisma.user.create({
      data: {
        firstname: "Worker",
        lastname: "Three",
        email: "worker3@example.com",
        password: await hash("worker123", 10),
        role: Role.WORKER,
        imageUrl: "https://example.com/worker3.jpg",
      },
    }),
    prisma.user.create({
      data: {
        firstname: "Worker",
        lastname: "Four",
        email: "worker4@example.com",
        password: await hash("worker123", 10),
        role: Role.WORKER,
        imageUrl: "https://example.com/worker4.jpg",
      },
    }),
  ]);

  // Create tasks (some by admin, some by managers)
  const taskTitles = [
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

  const taskTitleLarge = [...taskTitles, ...taskTitles, ...taskTitles];

  const tasks = await Promise.all(
    taskTitleLarge.map((title, index) => {
      // Alternate between admin and managers as authors
      const authorId =
        index % 3 === 0
          ? admin.id
          : index % 3 === 1
          ? managers[0].id
          : managers[1].id;

      // Random priorities and difficulties
      const priority = [Priority.LOW, Priority.AVERAGE, Priority.HIGH][
        Math.floor(Math.random() * 3)
      ];
      const difficulty = [Difficulty.EASY, Difficulty.MIDDLE, Difficulty.HARD][
        Math.floor(Math.random() * 3)
      ];

      // Deadline between 1 and 30 days from now
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + Math.floor(Math.random() * 30) + 1);

      return prisma.task.create({
        data: {
          title,
          description: `This is a detailed description for ${title}. It explains what needs to be done and any special considerations.`,
          priority,
          difficulty,
          completed:
            Math.random() > 0.8
              ? true
              : Math.random() > 0.9
              ? false
              : undefined, // 20% chance of being completed
          authorId,
          deadline,
        },
      });
    })
  );

  // Create assignments
  // Each worker will be assigned to 5-8 tasks
  // Some tasks will have multiple workers assigned
  const assignments: Assignment[] = [];

  for (const worker of workers) {
    const tasksToAssign = Math.floor(Math.random() * 4) + 5; // 5-8 tasks per worker

    // Shuffle tasks and pick random ones
    const shuffledTasks = [...tasks].sort(() => 0.5 - Math.random());

    for (let i = 0; i < tasksToAssign; i++) {
      // Skip if already assigned to this task
      if (
        !assignments.some(
          (a) => a.userId === worker.id && a.taskId === shuffledTasks[i].id
        )
      ) {
        assignments.push({
          userId: worker.id,
          taskId: shuffledTasks[i].id,
        });
      }
    }
  }

  // Specifically ensure some tasks have multiple workers
  // Let's pick 5 tasks and assign 2-3 workers to each
  const tasksForMultipleWorkers = [...tasks]
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  for (const task of tasksForMultipleWorkers) {
    const workersForTask = [...workers]
      .sort(() => 0.5 - Math.random())
      .slice(
        0,
        Math.floor(Math.random() * 2) + 2 // 2-3 workers
      );

    for (const worker of workersForTask) {
      if (
        !assignments.some((a) => a.userId === worker.id && a.taskId === task.id)
      ) {
        assignments.push({
          userId: worker.id,
          taskId: task.id,
        });
      }
    }
  }

  // Create assignments in database
  await prisma.assignment.createMany({
    data: assignments,
  });

  console.log("Database seeded successfully!");
  console.log(`Created: 
  - 1 admin
  - 2 managers
  - 4 workers
  - 20 tasks
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
