import { PayloadAction } from "@reduxjs/toolkit";
import type { CurrentPageSchema } from "../types/CurrentPageSchema";
import { buildSlice } from "@/shared/lib/store";

const initialState: CurrentPageSchema = {
  page: "home",
};

const currentPageSlice = buildSlice({
  name: "currentPage",
  initialState,
  reducers: {
    changePage: (
      state,
      { payload }: PayloadAction<CurrentPageSchema["page"]>
    ) => {
      state.page = payload;
    },
  },
});

export const {
  name,
  reducer,
  actions: { changePage },
  useActions,
} = currentPageSlice;
