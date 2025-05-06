export const Routes = {
  ROOT: "/",
  TASKS_LIST: "/tasks",
  USERS_LIST: "/users",
  USER: (id: string) => `./users/${id}`,
  TASK: (id: string) => `./tasks/${id}`,
} as const;
