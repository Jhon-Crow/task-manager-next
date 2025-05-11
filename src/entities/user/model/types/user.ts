import { User } from "@/shared/lib/db/generated";
import { z } from "zod";
import { userFormSchema } from "@/entities/user/model/validation/schema";
import { TypeTask } from "@/entities/task/public-types";

export type TypeUser = Omit<User, "password">;
export type TypeUserReceivedByID = TypeUser & { tasks: TypeTask[] };
export type TypeUserForm = z.infer<typeof userFormSchema>;
export type TypeRoleUser = User["role"];
