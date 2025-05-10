import {User} from "@/shared/lib/db/generated";
import { z } from "zod";
import {userFormSchema} from "@/entities/user/model/validation/schema";

export type TypeUser = Omit<User, 'password'>;
export type TypeUserForm = z.infer<typeof userFormSchema>;
export type TypeRoleUser = User["role"];
