import { User } from "@/shared/lib/db/generated";
import { z } from "zod";
import {
  userCreateFormClientSchema,
  userUpdateFormSchema,
} from "@/entities/user/model/validation/schema";
import { TypeTask } from "@/entities/task/public-types";

export type TypeUser = Omit<User, "password">;
export type TypeUserReceivedByID = TypeUser & { tasks: TypeTask[] };
export type TypeUserCreateForm = z.infer<typeof userCreateFormClientSchema> & {
  confirmPassword: string;
};
export type TypeUserUpdateForm = z.infer<typeof userUpdateFormSchema>;
export type TypeRoleUser = User["role"];
