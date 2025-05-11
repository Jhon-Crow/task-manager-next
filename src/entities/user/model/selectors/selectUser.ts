"use client";

import { buildSelectors } from "@/shared/lib/store";
import { createSelector } from "@reduxjs/toolkit";

export const [useSelectUserFirstname, selectUserFirstname] = buildSelectors(
  (state) => state.userSlice?.user?.firstname
);

export const [useSelectUserLastname, selectUserLastname] = buildSelectors(
  (state) => state.userSlice?.user?.lastname
);

export const [useSelectUserFullName, selectUserFullname] = buildSelectors(
  createSelector(
    [selectUserFirstname, selectUserLastname],
    (firstname, lastname) => {
      if (!lastname) {
        return firstname;
      }
      return `${firstname} ${lastname}`;
    }
  )
);
