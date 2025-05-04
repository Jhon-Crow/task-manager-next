import {
  PrismaClient,
  Role,
  Priority,
  Difficulty,
} from "../../src/shared/lib/db/generated";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Очищаем базу данных в правильном порядке
  await prisma.assignment.deleteMany();
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  // Создаем тестовых пользователей
  await prisma.user.createMany({
    data: [
      {
        firstname: "Admin",
        lastname: "User",
        email: "admin@example.com",
        password: await hash("admin123", 10),
        role: Role.ADMIN,
      },
      {
        firstname: "Manager",
        lastname: "User",
        email: "manager@example.com",
        password: await hash("manager123", 10),
        role: Role.MANAGER,
      },
      {
        firstname: "Worker1",
        email: "worker1@example.com",
        password: await hash("worker123", 10),
        role: Role.WORKER,
      },
      {
        firstname: "Worker2",
        email: "worker2@example.com",
        password: await hash("worker123", 10),
        role: Role.WORKER,
      },
    ],
  });

  console.log(`Created 4 users`);

  // Получаем созданных пользователей
  const createdUsers = await prisma.user.findMany();
  const admin = createdUsers.find((u) => u.role === Role.ADMIN)!;
  const manager = createdUsers.find((u) => u.role === Role.MANAGER)!;

  // Создаем задачи
  const tasks = await prisma.task.createMany({
    data: [
      {
        title: "Implement Auth System",
        description: "Create authentication system with JWT",
        priority: Priority.HIGH,
        difficulty: Difficulty.HARD,
        authorId: admin.id,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 дней
      },
      {
        title: "Design Home Page",
        description: "Create new UI design for home page",
        priority: Priority.AVERAGE,
        difficulty: Difficulty.MIDDLE,
        authorId: manager.id,
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // +3 дня
      },
      {
        title: "Fix Database Issues",
        priority: Priority.HIGH,
        authorId: admin.id,
        deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // +1 день
      },
    ],
  });

  console.log(`Created ${tasks.count} tasks`);

  // Получаем созданные задачи
  const createdTasks = await prisma.task.findMany();

  // Создаем назначения
  const workers = createdUsers.filter((u) => u.role === Role.WORKER);
  const assignments = await prisma.assignment.createMany({
    data: [
      {
        userId: workers[0].id,
        taskId: createdTasks[0].id,
      },
      {
        userId: workers[1].id,
        taskId: createdTasks[1].id,
      },
      {
        userId: workers[0].id,
        taskId: createdTasks[2].id,
      },
    ],
  });

  console.log(`Created ${assignments.count} assignments`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
