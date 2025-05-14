import { createTask, TaskForm } from "@/entities/task";
import {UserForm} from "@/entities/user/ui/user-form/user-form";
import {createUser} from "@/entities/user/model/service/createUser/createUser";

export const AddUserForm = () => {
  return <UserForm submit={createUser} />;
};
