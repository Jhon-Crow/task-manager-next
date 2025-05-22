"use client";

import { createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";
import { TaskInTasksList } from "../types/TasksListSchema";
import { buildSlice } from "@/shared/lib/store";
import { TypeTask } from "../types/task";

export const tasksListAdapter = createEntityAdapter<
  TaskInTasksList,
  TaskInTasksList["id"]
>({
  selectId: (task: TaskInTasksList) => task.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const tasksListSlice = buildSlice({
  name: "tasksListSlice",
  initialState: tasksListAdapter.getInitialState(),
  reducers: {
    addTasks: {
      reducer: tasksListAdapter.addMany,
      prepare: (tasks: TypeTask[]) => {
        return { payload: tasks.map((task) => ({ ...task, pending: false })) };
      },
    },
    setPendingTaskById: (
      state,
      {
        payload,
      }: PayloadAction<{ id: TaskInTasksList["id"]; pending: boolean }>
    ) => {
      tasksListAdapter.updateOne(state, {
        id: payload.id,
        changes: { pending: payload.pending },
      });
    },
    removeTaskById: tasksListAdapter.removeOne,
    removeAllTasks: tasksListAdapter.removeAll,
  },
});

export const {
  name: tasksListReducerName,
  reducer: tasksListReducer,
  useActions: useTasksListActions,
  actions: { addTasks, setPendingTaskById, removeTaskById, removeAllTasks },
} = tasksListSlice;
