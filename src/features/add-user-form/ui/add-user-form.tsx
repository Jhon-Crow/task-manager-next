import { UserForm } from "@/entities/user";
import { createUser } from "@/entities/user";

export const AddUserForm = () => {
  return <UserForm submit={createUser} />;
};
