"use client";

import { UserForm, useSelectUser } from "@/entities/user";
import { updateUser } from "@/entities/user";
import { TypeUserUpdateForm } from "@/entities/user/types";
import { redirect } from "next/navigation";

export const UpdateUserForm = () => {
  const user = useSelectUser();
  if (!user) redirect("/not-found");
  return (
    <UserForm
      defaultValues={user as TypeUserUpdateForm}
      userId={user.id}
      submit={updateUser}
    />
  );
};
