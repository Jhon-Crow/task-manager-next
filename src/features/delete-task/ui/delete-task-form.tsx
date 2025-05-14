"use client";

import { deleteTaskById } from "@/entities/task/model/service/deleteTaskById/deleteTaskById";
import { TypeTask } from "@/entities/task/public-types";
import { useServerAction } from "@/shared/hooks/useServerAction";
import { DeleteTaskFormBtn } from "./delete-task-form-btn";

export default function DeleteTaskForm({ id }: { id: TypeTask["id"] }) {
  const deleteTaskByIdHandler = useServerAction(deleteTaskById);
  return (
    <form
      action={() => {
        deleteTaskByIdHandler(id);
      }}
    >
      <DeleteTaskFormBtn />
    </form>
  );
}
