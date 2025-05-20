"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input } from "@/shared/ui";
import { TypeTask, TypeTaskForm } from "../../model/types/task";
import { taskFormSchema } from "../../model/validation/schema";
import { TaskTitleField } from "./fields/task-title-field";
import { TaskDescriptionField } from "./fields/task-desciption-field";
import { TaskPriorityField } from "./fields/task-priority-field";
import { TaskDifficlyField } from "./fields/task-difficulty-field";
import { TaskFormBtn } from "./task-form-btn";
import { ApiResult } from "@/shared/types";
import { redirect } from "next/navigation";
import { Routes } from "@/shared/consts/paths";
import { TaskCalendarDeadlineField } from "./fields/task-calendar-deadline-field";
import { useServerAction } from "@/shared/hooks/useServerAction";

export function TaskForm({
  defaultValues,
  id,
  authorId,
  submit,
}: {
  defaultValues?: Partial<TypeTaskForm>;
  id?: TypeTask["id"];
  authorId: TypeTask["author"]["id"];
  submit: (values: TypeTaskForm) => Promise<ApiResult<void>>;
}) {
  const isCreate = defaultValues ? false : true;
  const now = new Date();
  now.setHours(23, 59, 59);
  const handledSubmit = useServerAction(submit);
  const deadline = defaultValues?.deadline ? defaultValues.deadline : now;
  const form = useForm<TypeTaskForm>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          title: "",
          deadline: deadline,
          description: "",
          authorId,
        },
  });

  const submitHandler = async (values: TypeTaskForm) => {
    const success = await handledSubmit(values);
    if (success === false) return;
    redirect(id ? Routes.TASK(id) : Routes.TASKS_LIST);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-8">
        <div className="flex w-full gap-x-2">
          <div className="flex-1 space-y-5">
            <TaskTitleField control={form.control} name="title" />
            <TaskDescriptionField
              className="h-full"
              control={form.control}
              name="description"
            />
          </div>
          <TaskCalendarDeadlineField control={form.control} name="deadline" />
        </div>
        <div className="flex gap-x-16">
          <TaskPriorityField control={form.control} name="priority" />
          <TaskDifficlyField control={form.control} name="difficulty" />
        </div>
        <TaskFormBtn isCreate={isCreate} className="block ml-auto" />
        <Input type="hidden" name="authorId" value={authorId} />
      </form>
    </Form>
  );
}
