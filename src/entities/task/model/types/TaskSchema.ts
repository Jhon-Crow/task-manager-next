import type {
  TypeReview,
  TypeTask,
  TypeTaskForm,
  TypeTaskWorker,
} from "./task";

export type ReviewsToSchema = Omit<TypeReview, "createdAt" | "updatedAt"> & {
  createdAt: number;
  updatedAt: number;
};

export type TaskForSchema =
  | (Omit<TypeTask, "deadline" | "createdAt" | "updatedAt" | "reviews"> & {
      deadline: number;
      createdAt: number;
      updatedAt?: number;
      reviews: ReviewsToSchema[];
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
