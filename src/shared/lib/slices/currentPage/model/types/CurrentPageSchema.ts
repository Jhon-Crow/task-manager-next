export type PagesForNavbar = "home" | "tasks/[id]" | "users/[id]" | null;

export interface CurrentPageSchema {
  page: PagesForNavbar;
}
