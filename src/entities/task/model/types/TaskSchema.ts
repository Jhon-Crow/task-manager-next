import type { TypeTask, TypeTaskForm } from "./task";

export type TaskForSchema =
  | (Omit<TypeTask, "deadline" | "createdAt" | "updatedAt"> & {
      deadline: number;
      createdAt: number;
      updatedAt?: number;
    })
  | null;

export type TaskFormForSchema = Omit<TypeTaskForm, "deadline"> & {
  deadline: number;
};

export interface TaskSchema {
  task: TaskForSchema;
  newTask: TaskFormForSchema;
}
