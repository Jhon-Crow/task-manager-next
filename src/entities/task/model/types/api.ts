import { TypeTask } from "./task";

export type TasksResponse = { tasks: TypeTask[]; nextCursor: TypeTask["id"] };

export type TasksFilters = {
  title?: string;
  completed?: boolean;
};

// Добавьте этот тип для пагинированного ответа
export interface PaginatedTasksResponse {
  tasks: TypeTask[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}