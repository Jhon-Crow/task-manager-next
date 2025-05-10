import { buildSelectors } from "@/shared/lib/store";

export const [useSelectCurrentPage, selectCurrentPage] = buildSelectors(
  (state) => state.currentPage.page
);
