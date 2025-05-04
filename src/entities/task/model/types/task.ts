import type { Task } from "@/shared/lib/db/generated";

export type TypeTask = Task;
export type TypeDifficultTask = Task["difficulty"];
export type TypePriorityTask = Task["priority"];
