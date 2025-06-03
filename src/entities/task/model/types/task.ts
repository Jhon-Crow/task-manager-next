import type { Task } from "@/shared/lib/db/generated";
import { z } from "zod";
import { taskFormSchema } from "../validation/schema";
import { TypeUser } from "@/entities/user/types";

export type TypeTask = Omit<Task, "authorId"> & {
  author: TypeTaskWorker & { role: TypeUser["role"] };
  workers?: TypeTaskWorker[];
  reviews: TypeReview[];
};
export type TypeTaskForm = z.infer<typeof taskFormSchema>;
export type TypeDifficultTask = Task["difficulty"];
export type TypePriorityTask = Task["priority"];

export type TypeTaskWorker = Pick<
  TypeUser,
  "id" | "firstname" | "lastname" | "imageUrl" | "email"
> & { tasksCount?: number };

export type TypeReview = {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  taskId: string;
  userId: string;
  author: TypeUser;
  Task: Task;
};

export type TypeTaskColumns = TypeTask;
