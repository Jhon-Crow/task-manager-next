import type { TypeTask, TypeTaskForm, TypeTaskWorker } from "./task";

export type TaskForSchema =
  | (Omit<TypeTask, "deadline" | "createdAt" | "updatedAt"> & {
      deadline: number;
      createdAt: number;
      updatedAt?: number;
    })
  | null;

export type TaskFormForSchema =
  | (Omit<TypeTaskForm, "deadline"> & {
      deadline: number;
    })
  | null;

export interface TaskSchema {
  task: TaskForSchema;
  newTask: TaskFormForSchema;
  workers: TypeTaskWorker[];
}
