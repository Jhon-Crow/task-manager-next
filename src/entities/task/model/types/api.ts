import { TypeTask } from "./task";

export type TasksResponse = { tasks: TypeTask[]; nextCursor: TypeTask["id"] };

export type TasksFilters = {
  title?: string;
  completed?: boolean;
};
