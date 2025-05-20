"use client";

import { TasksFilters, TypeTask } from "@/entities/task/public-types";
import { SortingState, Table } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import { createContext, Dispatch, Ref, SetStateAction } from "react";

type TasksDataTableContextValues = {
  sorting?: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  setFilters: Dispatch<SetStateAction<TasksFilters>>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  table: Table<TypeTask>;
  tableRef: Ref<HTMLDivElement> | null;
  isLoading: boolean;
};

export const TasksDataTableContext =
  createContext<TasksDataTableContextValues | null>(null);
