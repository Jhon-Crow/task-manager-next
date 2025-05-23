"use client";

import { buildSelectors } from "@/shared/lib/store";

export const [useSelectNewTaskTitle, selectNewTaskTitle] = buildSelectors(
  (state) => state.taskSlice?.newTask?.title
);

export const [useSelectNewTaskDescription, selectNewTaskDescription] =
  buildSelectors((state) => state.taskSlice?.newTask?.description);

export const [useSelectNewTaskDeadline, selectNewTaskDeadline] = buildSelectors(
  (state) => state.taskSlice?.newTask?.deadline
);

export const [useSelectNewTaskDifficulty, selectNewTaskDifficulty] =
  buildSelectors((state) => state.taskSlice?.newTask?.difficulty);

export const [useSelectNewTaskPriority, selectNewTaskPriority] = buildSelectors(
  (state) => state.taskSlice?.newTask?.priority
);
