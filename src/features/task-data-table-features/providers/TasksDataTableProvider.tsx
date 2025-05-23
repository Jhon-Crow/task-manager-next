"use client";

import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TasksFilters } from "@/entities/task/public-types";
import { taskDataDefaultColumns, useInfinityTasks } from "@/entities/task";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useIsBottomVisible } from "@/shared/hooks/useIsBottomVisible";
import { taskDataTableMenuInColumns } from "../ui/task-data-table-menu/task-data-table-menu";
import { TasksDataTableContext } from "../contexts/TasksDataTableContext";
import { taskDataTableSortingInColumns } from "../ui/task-data-table-sortings/task-data-table-sorting";

export const TaskDataTableProvider = ({
  children,
}: {
  children: ReactNode;
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

  const table = useReactTable({
    data: tasks,
    columns: Object.values(
      Object.assign(
        {},
        taskDataDefaultColumns,
        {
          actions: taskDataTableMenuInColumns,
        },
        taskDataTableSortingInColumns
      )
    ),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
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
