"use client";

import { buildSelectors } from "@/shared/lib/store";
import { createSelector } from "@reduxjs/toolkit";
import { selectWorkers } from "./selectTask";

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

export const [useSelectNewTaskWorkersId, selectNewTaskWorkersId] =
  buildSelectors((state) => state.taskSlice?.newTask?.workersId);

export const [useSelectNewTaskAuthorId, selectNewTaskAuthorId] = buildSelectors(
  (state) => state.taskSlice?.newTask?.authorId
);

export const [useSelectNewTaskWorkers, selectNewTaskWorkers] = buildSelectors(
  createSelector(
    [selectNewTaskWorkersId, selectWorkers],
    (workersId, workers) => {
      return workers?.filter((worker) =>
        workersId?.some((id) => worker.id === id)
      );
    }
  )
);
