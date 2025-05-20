import type { Task } from "@/shared/lib/db/generated";
import { z } from "zod";
import { taskFormSchema } from "../validation/schema";
import { TypeUser } from "@/entities/user/types";

export type TypeTask = Omit<Task, "authorId"> & {
  author: TypeTaskWorker & { role: TypeUser["role"]; email: TypeUser["email"] };
  workers?: TypeTaskWorker[];
};
export type TypeTaskForm = z.infer<typeof taskFormSchema>;
export type TypeDifficultTask = Task["difficulty"];
export type TypePriorityTask = Task["priority"];

export type TypeTaskWorker = Pick<
  TypeUser,
  "id" | "firstname" | "lastname" | "imageUrl"
>;
export type TypeTaskColumns = TypeTask;
