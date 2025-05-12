import { TaskForSchema } from "@/entities/task/public-types";
import { TypeUser } from "./user";

export type UserSchema = {
  user:
    | (Omit<TypeUser, "createdAt" | "tasks"> & {
        createdAt: number;
        tasks: TaskForSchema[];
      })
    | null;
};
