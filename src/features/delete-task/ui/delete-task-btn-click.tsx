"use client";

import { deleteTaskById } from "@/entities/task/model/service/deleteTaskById/deleteTaskById";
import { TypeTask } from "@/entities/task/public-types";
import { useServerAction } from "@/shared/hooks/useServerAction";
import { DeleteTaskBtn } from "./delete-task-btn";
import { useTransition } from "react";

export const DeleteTaskBtnClick = ({ id }: { id: TypeTask["id"] }) => {
  const handleDeleteTaskById = useServerAction(deleteTaskById);
  const [isLoading, startTransition] = useTransition();
  const onClickHandler = async () => {
    startTransition(() => {
      handleDeleteTaskById(id);
    });
  };
  return <DeleteTaskBtn disabled={isLoading} onClick={onClickHandler} />;
};
