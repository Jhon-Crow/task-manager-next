"use client";

import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnDef,
  TableOptions,
} from "@tanstack/react-table";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  TasksFilters,
  TypeTask,
  TypeTaskColumns,
} from "@/entities/task/public-types";
import { taskDataDefaultColumns, useInfinityTasks } from "@/entities/task";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useIsBottomVisible } from "@/shared/hooks/useIsBottomVisible";
import { taskDataTableMenuInColumns } from "../";
import { TasksDataTableContext } from "../contexts/TasksDataTableContext";
import { taskDataTableSortingInColumns } from "../";

export const TaskDataTableProvider = ({
  children,
  addColumns,
  shiftColumns,
  options,
}: {
  children: ReactNode;
  addColumns?: Record<string, ColumnDef<TypeTaskColumns>>;
  shiftColumns?: Record<string, ColumnDef<TypeTaskColumns>>;
  options?: Omit<
    TableOptions<TypeTaskColumns>,
    "data" | "columns" | "getCoreRowModel"
  >;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState<TasksFilters>({});
  const observerRef = useRef<HTMLDivElement>(null);
  const isBottomVisible = useIsBottomVisible(observerRef);

  const { tasks, isFetching, isLoading, fetchNextPage, hasNextPage } =
    useInfinityTasks({
      initialFilters: filters,
      pageSize: 10,
    });

  const fetchMoreOnButtomReacher = useCallback(() => {
    if (isBottomVisible) {
      fetchNextPage();
    }
  }, [fetchNextPage, isBottomVisible]);

  const columns = useMemo(() => {
    return Object.values(
      Object.assign(
        {},
        shiftColumns,
        taskDataDefaultColumns,
        {
          actions: taskDataTableMenuInColumns,
        },
        taskDataTableSortingInColumns,
        addColumns
      )
    ) as ColumnDef<TypeTask, unknown>[];
  }, [addColumns, shiftColumns]);

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    ...options,
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? rows.length + 1 : rows.length,
    getScrollElement: () => observerRef.current,
    estimateSize: () => 60,
    overscan: 5,
  });

  useEffect(() => {
    fetchMoreOnButtomReacher();
  }, [fetchMoreOnButtomReacher]);

  const value = useMemo(
    () => ({
      table,
      setSorting,
      setFilters,
      observerRef,
      rows,
      rowVirtualizer,
      isLoading: isFetching || isLoading,
    }),
    [isFetching, isLoading, rowVirtualizer, rows, table]
  );

  return (
    <TasksDataTableContext value={value}>{children}</TasksDataTableContext>
  );
};
