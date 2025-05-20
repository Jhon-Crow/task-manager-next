"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "@/shared/ui";
import {
  TypeUser,
  TypeUserCreateForm,
  TypeUserUpdateForm,
} from "../../model/types/user";
import {
  userCreateFormClientSchema,
  userUpdateFormSchema,
} from "../../model/validation/schema";
import { UserRoleField } from "./fields/user-role-field";
import { UserFormBtn } from "./user-form-btn";
import { ApiResult } from "@/shared/types";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Routes } from "@/shared/consts/paths";
import { ReactNode } from "react";
import { UserFirstnameField } from "./fields/user-firstname-field";
import { UserLastnameField } from "./fields/user-lastname-field";
import { UserEmailField } from "./fields/user-email-field";
import { UserImageUrlField } from "./fields/user-image-url-field copy";
import { UserPasswordField } from "./fields/user-password-field";
import { UserConfirmPasswordField } from "./fields/user-confirm-password-field";

type CreateUserFormProps = {
  defaultValues?: undefined;
  userId?: undefined;
  submit: (values: TypeUserCreateForm) => Promise<ApiResult<void>>;
};

type UpdateUserFormProps = {
  defaultValues: TypeUserUpdateForm;
  userId: TypeUser["id"];
  submit: (
    values: TypeUserUpdateForm,
    id: TypeUser["id"]
  ) => Promise<ApiResult<void>>;
};

export function UserForm({
  defaultValues,
  submit,
  userId,
}: CreateUserFormProps | UpdateUserFormProps): ReactNode {
  const isCreate = !defaultValues;

  const form = useForm<TypeUserCreateForm | TypeUserUpdateForm>({
    resolver: zodResolver(
      isCreate ? userCreateFormClientSchema : userUpdateFormSchema
    ),
    defaultValues: !defaultValues
      ? {
          role: "WORKER",
          firstname: "",
          lastname: "",
          email: "",
          imageUrl: "",
          password: "",
          confirmPassword: "",
        }
      : {
          role: defaultValues!.role,
          firstname: defaultValues!.firstname,
          email: defaultValues!.email,
          imageUrl: defaultValues!.imageUrl ? defaultValues!.imageUrl : "",
          lastname: defaultValues!.lastname ? defaultValues!.lastname : "",
        },
  });

  const submitHandler = async (
    values: typeof userId extends string
      ? TypeUserUpdateForm
      : TypeUserCreateForm
  ) => {
    const data = await (userId !== undefined
      ? submit(values, userId)
      : submit(values));

    if (!data.success) {
      toast.error(data.error.message);
      return;
    }
    toast.info("Успешно");
    if (userId) {
      redirect(Routes.USER(userId));
    }
    redirect(Routes.USERS_LIST);
  };
  return (
    <Form {...form}>
      <form
        // @ts-expect-error nu tak nado
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-8"
      >
        <div className="flex gap-x-16">
          {/* @ts-expect-error nu tak nado */}
          <UserFirstnameField control={form.control} name="firstname" />
          <UserLastnameField
            name="lastname"
            // @ts-expect-error nu tak nado
            control={form.control}
          />
        </div>

        <div className="flex gap-x-16">
          {/* @ts-expect-error nu tak nado */}
          <UserEmailField control={form.control} name="email" />

          <UserImageUrlField
            // @ts-expect-error nu tak nado
            control={form.control}
            name="imageUrl"
          />
        </div>

        {isCreate && (
          <div className="flex gap-x-16">
            {/* @ts-expect-error nu tak nado */}
            <UserPasswordField control={form.control} name="password" />
            <UserConfirmPasswordField
              // @ts-expect-error nu tak nado
              control={form.control}
              name="confirmPassword"
            />
          </div>
        )}

        <UserRoleField
          defaultValue={defaultValues?.role}
          // @ts-expect-error nu tak nado
          control={form.control}
        />

        <div className="flex">
          <Button variant="destructive" onClick={() => form.reset()}>
            Отменить
          </Button>
          <UserFormBtn isCreate={isCreate} className="block ml-auto" />
        </div>
      </form>
    </Form>
  );
}
