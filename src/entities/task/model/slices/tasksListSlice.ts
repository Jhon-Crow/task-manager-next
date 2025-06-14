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

const initialState = tasksListAdapter.getInitialState({
  selectedTasksToRemove: [] as TypeTask['id'][],
});

const tasksListSlice = buildSlice({
  name: "tasksListSlice",
  initialState,
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
    setSelectedTasks: (state, action: PayloadAction<TypeTask['id'][]>) => {
      state.selectedTasksToRemove = action.payload;
    },
    clearSelectedForRemove: (state) => {
      state.selectedTasksToRemove = [];
    },
    removeSelectedTasks: (state) => {
      tasksListAdapter.removeMany(state, state.selectedTasksToRemove);
      state.selectedTasksToRemove = [];
    },
    removeTaskById: (state, action: PayloadAction<string>) => {
      tasksListAdapter.removeOne(state, action.payload);
      const index = state.selectedTasksToRemove.indexOf(action.payload);
      if (index !== -1) {
        state.selectedTasksToRemove.splice(index, 1);
      }
    },
    removeAllTasks: tasksListAdapter.removeAll,
  },
});

export const {
  name: tasksListReducerName,
  reducer: tasksListReducer,
  useActions: useTasksListActions,
  actions: {
    addTasks,
    setPendingTaskById,
    removeTaskById,
    removeAllTasks,
    setSelectedTasks,
    clearSelectedForRemove,
    removeSelectedTasks
  },
} = tasksListSlice;