"use client";

import { TypeTask } from "@/entities/task/public-types";
import { DynamicModuleLoader } from "@/shared/lib/components";
import { ReactNode, useEffect } from "react";
import { reducer, name, useActions } from "../model/slice/taskSlice";
import { useCurrentPageActions } from "@/shared/lib/slices/currentPage";

interface TaskProviderProps {
  children: ReactNode;
  task: TypeTask | null;
}

const reducers: ReducersList = {
  [name]: reducer,
};

export const TaskProvider = ({ children, task }: TaskProviderProps) => {
  const { changePage } = useCurrentPageActions();
  const { setTask } = useActions();

  useEffect(() => {
    changePage("tasks/[id]");
    setTask(task ? task : null);
  }, [changePage, setTask, task]);
  return (
    <DynamicModuleLoader reducers={reducers}>{children}</DynamicModuleLoader>
  );
};
