import { EntityState } from "@reduxjs/toolkit";
import type { TypeTask } from "./task";

export type TaskInTasksList = TypeTask & {
  pending?: boolean;
};

export type TasksListSchema = EntityState<
  TaskInTasksList,
  TaskInTasksList["id"]
>;
