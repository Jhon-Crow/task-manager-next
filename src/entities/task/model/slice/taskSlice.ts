"use client";

import { buildSlice } from "@/shared/lib/store";
import {
  TaskFormForSchema,
  TaskForSchema,
  TaskSchema,
} from "../types/TaskSchema";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TypeTaskForm } from "../types/task";

const initialState: TaskSchema = {
  task: null,
  newTask: { deadline: new Date().getTime() } as Omit<
    TypeTaskForm,
    "deadline"
  > & { deadline: number },
};

const taskSlice = buildSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    setTask: (state, { payload }: PayloadAction<TaskForSchema | null>) => {
      state.task = payload;
    },

    setNewTask: (state, { payload }: PayloadAction<TaskFormForSchema>) => {
      state.newTask = { ...payload, deadline: payload.deadline };
    },
    setNewTaskDeadline: (
      state,
      { payload }: PayloadAction<number | undefined>
    ) => {
      if (!state.newTask || !payload) return;
      state.newTask.deadline = payload;
    },
    setNewTaskTitle: (state, { payload }: PayloadAction<string>) => {
      if (!state.newTask) return;
      state.newTask.title = payload;
    },
    setNewTaskDesctiption: (
      state,
      { payload }: PayloadAction<string | undefined>
    ) => {
      if (!state.newTask) return;
      state.newTask.description = payload;
    },
    setNewTaskDifficulty: (
      state,
      { payload }: PayloadAction<TypeTaskForm["difficulty"]>
    ) => {
      if (!state.newTask) return;
      state.newTask.difficulty = payload;
    },
    setNewTaskPriority: (
      state,
      { payload }: PayloadAction<TypeTaskForm["priority"]>
    ) => {
      if (!state.newTask) return;
      state.newTask.priority = payload;
    },
  },
});

export const {
  actions: {
    setTask,
    setNewTaskDeadline,
    setNewTaskDesctiption,
    setNewTaskDifficulty,
    setNewTaskPriority,
    setNewTaskTitle,
  },
  name,
  reducer,
  useActions,
} = taskSlice;
