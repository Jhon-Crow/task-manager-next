"use client";

import { buildSelectors } from "@/shared/lib/store";

export const [useSelectTaskTitle, selectTaskTitle] = buildSelectors(
  (state) => state.taskSlice?.task?.title
);

export const [useSelectTaskCreatedAt, selectTaskCreatedAt] = buildSelectors(
  (state) => state.taskSlice?.task?.createdAt
);

export const [useSelectTask, selectTask] = buildSelectors(
  (state) => state.taskSlice?.task
);
