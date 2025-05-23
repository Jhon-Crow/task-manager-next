"use client";

import { buildSelectors } from "@/shared/lib/store";
import { tasksListAdapter } from "../slices/tasksListSlice";
import { TypeTask } from "../types/task";
import { createSelector } from "@reduxjs/toolkit";

const { selectAll, selectTotal, selectById } = tasksListAdapter.getSelectors();

export const [useSelectAllTasks, selectAllTasks] = buildSelectors((state) =>
  state.tasksListSlice ? selectAll(state.tasksListSlice) : []
);
export const [useSelectTotalTasks, selectTotalTasks] = buildSelectors((state) =>
  state.tasksListSlice ? selectTotal(state.tasksListSlice) : 0
);

export const [useSelectTaskInTaskListById, selectTaskInTaskListById] =
  buildSelectors((state, id: TypeTask["id"]) =>
    state.tasksListSlice ? selectById(state.tasksListSlice, id) : null
  );

export const [useSelectTaskTitleInTaskListById, selectTaskTitleInTaskListById] =
  buildSelectors(
    createSelector(selectTaskInTaskListById, (task) => task?.title)
  );

export const [
  useSelectTaskPendingInTaskListById,
  selectTaskPendingInTaskListById,
] = buildSelectors(
  createSelector(selectTaskInTaskListById, (task) => task?.pending)
);
