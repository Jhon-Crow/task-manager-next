import type { Task } from "@/shared/lib/db/generated";
import { z } from "zod";
import { taskFormSchema } from "../validation/schema";

export type TypeTask = Task;
export type TypeTaskForm = z.infer<typeof taskFormSchema>;
export type TypeDifficultTask = Task["difficulty"];
export type TypePriorityTask = Task["priority"];
