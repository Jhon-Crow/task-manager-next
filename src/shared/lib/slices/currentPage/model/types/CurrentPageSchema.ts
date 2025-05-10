export type PagesForNavbar = "home" | "tasks/[id]" | null;

export interface CurrentPageSchema {
  page: PagesForNavbar;
}
