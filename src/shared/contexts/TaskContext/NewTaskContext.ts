"use client";

import { TypeTaskForm } from "@/entities/task/public-types";
import { createContext } from "react";

type NewTaskContextValue = {
  newTask: TypeTaskForm;
  setNewTask: (values: Partial<TypeTaskForm>) => void;
};

export const NewTaskContext = createContext<NewTaskContextValue | null>(null);
