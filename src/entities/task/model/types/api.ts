import { TypeTask } from "./task";

export type TasksResponse = {
  tasks: TypeTask[];
  currentPage: number;
  totalPages: number;
  totalTasks: number;
};

export type TasksFilters = {
  title?: string;
  completed?: boolean;
};

export interface PaginatedTasksResponse {
  tasks: TypeTask[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

