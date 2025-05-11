"use client";

import { ReactNode, useEffect } from "react";
import { DynamicModuleLoader } from "@/shared/lib/components";
import { reducer, name, useActions } from "../model/slice/userSlice";
import { useCurrentPageActions } from "@/shared/lib/slices/currentPage";
import { TypeUserReceivedByID } from "../model/types/user";

const reducers: ReducersList = {
  [name]: reducer,
};

export const UserProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: TypeUserReceivedByID;
}) => {
  const { setUser } = useActions();
  const { changePage } = useCurrentPageActions();
  useEffect(() => {
    changePage("users/[id]");
    setUser(user);
  });
  return (
    <DynamicModuleLoader reducers={reducers}>{children}</DynamicModuleLoader>
  );
};
