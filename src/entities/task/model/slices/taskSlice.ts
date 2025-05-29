"use client";

import { buildSlice } from "@/shared/lib/store";
import {
  TaskFormForSchema,
  TaskForSchema,
  TaskSchema,
} from "../types/TaskSchema";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TypeTask, TypeTaskForm, TypeTaskWorker } from "../types/task";

const initialState: TaskSchema = {
  task: null,
  newTask: {} as TaskFormForSchema,
  workers: [],
};

const taskSlice = buildSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    setTask: {
      reducer: (state, { payload }: PayloadAction<TaskForSchema | null>) => {
        state.task = payload;
      },
      prepare: (task: TypeTask | null) => {
        if (!task) return { payload: null };
        return {
          payload: {
            ...task,
            deadline: task.deadline.getTime(),
            createdAt: task.createdAt.getTime(),
            updatedAt: task.updatedAt.getTime(),
          },
        };
      },
    },
    setWorkers: (state, { payload }: PayloadAction<TypeTaskWorker[]>) => {
      state.workers = payload;
    },
    setNewTask: {
      reducer: (state, { payload }: PayloadAction<TaskFormForSchema>) => {
        state.newTask = payload;
      },
      prepare: (taskForm: TypeTaskForm) => {
        return {
          payload: { ...taskForm, deadline: taskForm.deadline.getTime() },
        };
      },
    },
    setNewTaskWorkers: (
      state,
      { payload }: PayloadAction<TypeTaskWorker["id"][]>
    ) => {
      if (!state.newTask) return;
      const workersId = state.workers
        .filter((worker) => payload.some((id) => id === worker.id))
        .map((worker) => worker.id);
      state.newTask.workersId = workersId;
    },
    setNewTaskDeadline: {
      reducer: (state, { payload }: PayloadAction<number>) => {
        if (!state.newTask) return;
        state.newTask.deadline = payload;
      },
      prepare: (deadline: TypeTask["deadline"]) => {
        return { payload: deadline.getTime() };
      },
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
