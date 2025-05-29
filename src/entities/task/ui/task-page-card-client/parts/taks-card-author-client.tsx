"use client";

import { memo, useLayoutEffect, useState } from "react";
import { TaskPageAuthorField } from "../../task-page-card/parts";
import { getUserById } from "@/entities/user";
import { toast } from "sonner";
import { TypeUser } from "@/entities/user/types";
import { useSelectNewTaskAuthorId } from "../../../model/selectors/selectNewTaskFields";

export const TaskCardAuthorClient = memo(function TaskCardAuthorClient() {
  const authorId = useSelectNewTaskAuthorId();
  const [author, setAuthor] = useState<TypeUser>();
  useLayoutEffect(() => {
    const fetchAuthor = async () => {
      if (!authorId) return;
      const author = await getUserById(authorId);
      if (!author.success || !author.data) {
        toast.error("Невозможно получить автора");
        return;
      }
      setAuthor(author.data);
    };
    fetchAuthor();
  }, [authorId]);
  return author && <TaskPageAuthorField author={author} />;
});
