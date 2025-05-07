"use client";

import { TypeTask } from "@/entities/task/public-types";
import { createContext } from "react";

type TaskContextValue = {
  task: TypeTask;
};

export const TaskContext = createContext<TaskContextValue | null>(null);
