import {User} from "@/shared/lib/db/generated";

export type TypeUser = Omit<User, 'password'>;
export type TypeRoleUser = User["role"];
