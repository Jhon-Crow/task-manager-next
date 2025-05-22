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
import { TasksDataTableContext } from "../contexts/TasksDataTableContext";
import { TasksFilters } from "@/entities/task/public-types";
import { taskDataDefaultColumns, useInfinityTasks } from "@/entities/task";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useIsBottomVisible } from "@/shared/hooks/useIsBottomVisible";
import { taskDataTableMenuInColumns } from "../ui/task-data-table-menu/task-data-table-menu";

export const TaskDataTableSortingProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState<TasksFilters>({});
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const isBottomVisible = useIsBottomVisible(tableContainerRef);

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
      Object.assign({}, taskDataDefaultColumns, {
        actions: taskDataTableMenuInColumns,
      })
    ),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? rows.length + 1 : rows.length,
    getScrollElement: () => tableContainerRef.current,
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
      tableRef: tableContainerRef,
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
