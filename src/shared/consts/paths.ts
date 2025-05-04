export const Routes = {
  ROOT: "/",
  TASKS_LIST: "/tasks",
  TASK: (id: string) => `./tasks/${id}`,
} as const;
