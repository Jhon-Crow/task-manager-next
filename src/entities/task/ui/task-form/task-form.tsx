"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/ui";
import { TypeTaskForm } from "../../model/types/task";
import { taskFormSchema } from "../../model/validation/schema";
import { TaskTitleField } from "./fields/task-title-field";
import { TaskDescriptionField } from "./fields/task-desciption-field";
import { TaskDeadlineField } from "./fields/task-deadline-field";
import { TaskPriorityField } from "./fields/task-priority-field";
import { TaskDifficlyField } from "./fields/task-difficulty-field";
import { TaskFormBtn } from "./task-form-btn";
import { ApiResult } from "@/shared/types";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Routes } from "@/shared/consts/paths";

export function TaskForm({
  defaultValues,
  submit,
}: {
  defaultValues?: TypeTaskForm;
  submit: (values: TypeTaskForm) => Promise<ApiResult<void>>;
  sideEffect?: (values: Partial<TypeTaskForm>) => void;
}) {
  const isCreate = defaultValues ? false : true;
  const form = useForm<TypeTaskForm>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          title: "",
          deadline: 1,
          description: "",
        },
  });

  const submitHandler = async (values: TypeTaskForm) => {
    const data = await submit(values);
    if (!data.success) {
      toast.error(data.error.message);
      return;
    }
    toast.info("Успешно");
    if (isCreate) redirect(Routes.TASKS_LIST);

    redirect("../");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        <TaskTitleField control={form.control} name="title" />
        <TaskDescriptionField control={form.control} name="description" />
        <TaskDeadlineField control={form.control} name="deadline" />
        <div className="flex gap-x-16">
          <TaskPriorityField control={form.control} name="priority" />
          <TaskDifficlyField control={form.control} name="difficulty" />
        </div>
        <TaskFormBtn isCreate={isCreate} className="block ml-auto" />
      </form>
    </Form>
  );
}
