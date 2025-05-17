"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input} from "@/shared/ui";
import {TypeUserForm} from "../../model/types/user";
import {userFormSchema} from "../../model/validation/schema";
import {UserTextField} from "./fields/user-text-field";
import {UserRoleField} from "./fields/user-role-field";
import {UserFormBtn} from "./user-form-btn";
import {ApiResult} from "@/shared/types";
import {toast} from "sonner";
import {redirect} from "next/navigation";
import {Routes} from "@/shared/consts/paths";

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
      defaultValues: {
          role: "WORKER",
          firstname: "",
          lastname: "",
          email: "",
          imageUrl: "",
          password: "",
          confirmPassword: "",
          ...defaultValues
      },
  });

    const defaultValuesNew = {
        role: defaultValues.role || "WORKER",
        firstname: defaultValues.firstname || "",
        lastname: defaultValues.lastname || "",
        email: defaultValues.email || "",
        imageUrl: defaultValues.imageUrl || "",
        password: "",
        confirmPassword: ""
    }

  const submitHandler = async (values: TypeUserForm) => {
      let data;
      if (isCreate){
          data = await submit(values);
      } else {
          data = await submit(defaultValues.id, values);
      }
    if (!data.success) {
      toast.error(data.error.message);
      return;
    }
    toast.info("Успешно");
    redirect(Routes.USERS_LIST);

    redirect("../");
  };
    console.log(defaultValuesNew)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">

          <div className="flex gap-x-16">
              <UserTextField
                  defaultValue={defaultValues?.firstname}
                  title='Имя'
                  name='firstname'
                  control={form.control}
              />
              <UserTextField
                  defaultValue={defaultValues?.lastname || ''}
                  // defaultValue={defaultValuesNew.lastname}
                  // value={defaultValues?.lastname ? defaultValues.lastname : ''}
                  title='Фамилия (опц.)'
                  name='lastname'
                  control={form.control}
              />
          </div>



          <div className="flex gap-x-16">
          <UserTextField
              defaultValue={defaultValues?.email}
              title='Email'
              name='email'
              control={form.control}
          />

          <UserTextField
              defaultValue={defaultValues?.imageUrl ? defaultValues.imageUrl : ''}
              title='Аватарка (опц.)'
              name='imageUrl'
              control={form.control}
          />
          </div>

          <div className="flex gap-x-16">

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
                                          defaultValue={defaultValues?.password}
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
                                          defaultValue={defaultValues?.password}
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

          </div>
          <UserRoleField
              defaultValue={defaultValues?.role}
              control={form.control}/>

          <div
              className='flex'
          >
              <Button variant="destructive" onClick={() => redirect(Routes.USERS_LIST)}>Отменить</Button>
              <UserFormBtn isCreate={isCreate} className="block ml-auto" />
          </div>
      </form>
    </Form>
  );
}
