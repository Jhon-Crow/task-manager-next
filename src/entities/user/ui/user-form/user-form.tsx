"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input} from "@/shared/ui";
import {TypeUser, TypeUserForm} from "../../model/types/user";
import { userFormSchema } from "../../model/validation/schema";
import { UserFirstnameField } from "./fields/user-firstname-field";
// import { TaskDescriptionField } from "./fields/task-desciption-field";
// import { TaskDeadlineField } from "./fields/task-deadline-field";
// import { TaskPriorityField } from "./fields/task-priority-field";
import { UserRoleField } from "./fields/user-role-field";
import { UserFormBtn } from "./user-form-btn";
import { ApiResult } from "@/shared/types";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Routes } from "@/shared/consts/paths";
import {role} from "@/entities/user/model/consts/consts";

export function UserForm({
  defaultValues,
  submit,
}: {
  defaultValues?: TypeUserForm;
  submit: (values: TypeUserForm) => Promise<ApiResult<void>>;
  sideEffect?: (values: Partial<TypeUserForm>) => void;
}) {
  const isCreate = defaultValues ? false : true;
  const form = useForm<TypeUserForm>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          role: "WORKER",
        },
  });

  const submitHandler = async (values: TypeUserForm) => {
    const data = await submit(values);
    if (!data.success) {
      toast.error(data.error.message);
      return;
    }
    toast.info("Успешно");
    if (isCreate) redirect(Routes.USERS_LIST);

    redirect("../");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">


          <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel>Имя</FormLabel>
                      <div className="flex gap-4">
                              <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                      <Input
                                          type="text"
                                          onChange={(e) => field.onChange(e.target.value)}
                                      />
                                  </FormControl>
                              </FormItem>
                      </div>
                      <FormMessage />
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel>lastname</FormLabel>
                      <div className="flex gap-4">
                              <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                      <Input
                                          type="text"
                                          onChange={(e) => field.onChange(e.target.value)}
                                      />
                                  </FormControl>
                              </FormItem>
                      </div>
                      <FormMessage />
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel>Email</FormLabel>
                      <div className="flex gap-4">
                              <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                      <Input
                                          type="text"
                                          onChange={(e) => field.onChange(e.target.value)}
                                      />
                                  </FormControl>
                              </FormItem>
                      </div>
                      <FormMessage />
                  </FormItem>
              )}
          />


          <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <div className="flex gap-4">
                              <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                      <Input
                                          type="password"
                                          onChange={(e) => field.onChange(e.target.value)}
                                      />
                                  </FormControl>
                              </FormItem>
                      </div>
                      <FormMessage />
                  </FormItem>
              )}
          />


          <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel>Повтори пароль</FormLabel>
                      <div className="flex gap-4">
                              <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                      <Input
                                          type="password"
                                          onChange={(e) => field.onChange(e.target.value)}
                                      />
                                  </FormControl>
                              </FormItem>
                      </div>
                      <FormMessage />
                  </FormItem>
              )}
          />





          <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                  <FormItem>
                      <FormLabel>Роль</FormLabel>
                      <div className="flex gap-4">
                          {Object.keys(role).map((r) => (
                              <FormItem key={r} className="flex items-center space-x-2">
                                  <FormControl>
                                      <Input
                                          type="radio"
                                          checked={field.value === r}
                                          onChange={() => field.onChange(r)}
                                      />
                                  </FormControl>
                                  <FormLabel className="font-normal">{r}</FormLabel>
                              </FormItem>
                          ))}
                      </div>
                      <FormMessage />
                  </FormItem>
              )}
          />










        {/*<UserFirstnameField control={form.control} name="title" />*/}
        {/*<TaskDescriptionField control={form.control} name="description" />*/}
        {/*<TaskDeadlineField control={form.control} name="deadline" />*/}
        <div className="flex gap-x-16">
          {/*<TaskPriorityField control={form.control} name="priority" />*/}
          {/*<UserRoleField control={form.control} name="difficulty" />*/}
        </div>
        <UserFormBtn isCreate={isCreate} className="block ml-auto" />
      </form>
    </Form>
  );
}
