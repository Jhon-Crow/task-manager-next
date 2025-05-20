"use server";
import { UserForm } from "@/entities/user";
import { getUserById } from "@/entities/user";
import { User } from "@/shared/lib/db/generated";
import { updateUser } from "@/entities/user";
import { redirect } from "next/navigation";
import { TypeUserUpdateForm } from "@/entities/user/types";

export const UpdateUserForm = async ({ userId }: { userId: User["id"] }) => {
  const defaultValues = await getUserById(userId);
  if (!defaultValues.success || !defaultValues.data) {
    redirect("../not-found");
  }

  return (
    <UserForm
      defaultValues={defaultValues.data as TypeUserUpdateForm}
      userId={userId}
      submit={updateUser}
    />
  );
};
