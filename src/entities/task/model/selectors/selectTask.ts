"use client";

import { buildSelectors } from "@/shared/lib/store";
import { createSelector } from "@reduxjs/toolkit";

export const [useSelectTaskTitle, selectTaskTitle] = buildSelectors(
  (state) => state.taskSlice?.task?.title
);

export const [useSelectTaskCreatedAt, selectTaskCreatedAt] = buildSelectors(
  (state) => state.taskSlice?.task?.createdAt
);

export const [useSelectTask, selectTask] = buildSelectors(
  (state) => state.taskSlice?.task
);

export const [useSelectTaskWorkers, selectTaskWorkers] = buildSelectors(
  (state) => state.taskSlice?.task?.workers
);

export const [useSelectWorkers, selectWorkers] = buildSelectors(
  (state) => state.taskSlice?.workers
);
export const [useSelectTaskAuthor, selectTaskAuthor] = buildSelectors(
  (state) => state.taskSlice?.task?.author
);
export const [useSelectWorkersIdInTask, selectWorkersIdInTask] = buildSelectors(
  createSelector([selectTaskWorkers], (workers) =>
    workers?.map((worker) => worker.id)
  )
);
