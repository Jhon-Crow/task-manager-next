"use client";

import { useCallback, useEffect, useState } from "react";
import { useGetInfinityTaskQuery } from "../api/taskApi";
import { TasksFilters, TypeTask } from "../public-types";
import { useSelectAllTasks } from "../model/selectors/selectTaskList";
import { useTasksListActions } from "../model/slices/tasksListSlice";

export const useInfinityTasks = (params: {
  initialFilters: TasksFilters;
  pageSize?: number;
}) => {
  const [newParams, setNewParams] = useState({
    pageSize: 10,
    cursor: undefined as string | undefined,
    filters: params.initialFilters,
  });
  const tasks = useSelectAllTasks();
  const [newCursor, setNewCursor] = useState<TypeTask["id"] | null | undefined>(
    undefined
  );
  const { addTasks, removeAllTasks } = useTasksListActions();

  const { data, isLoading, isFetching } = useGetInfinityTaskQuery(newParams, {
    selectFromResult: ({ data, ...rest }) => ({
      data: { tasks: data?.tasks ?? [], nextCursor: data?.nextCursor },
      ...rest,
    }),
  });

  useEffect(() => {
    if (data && newCursor !== null && newCursor !== data.nextCursor) {
      addTasks(data.tasks);
      setNewCursor(data.nextCursor || null);
    }
  }, [addTasks, data, newCursor]);

  const fetchNextPage = useCallback(() => {
    setNewParams((prev) => ({
      ...prev,
      cursor: newCursor ? newCursor : undefined,
    }));
  }, [newCursor]);

  const updateFilters = useCallback(
    (newFilters: TasksFilters) => {
      removeAllTasks();
      setNewCursor(null);
      setNewParams({
        pageSize: 10,
        cursor: undefined,
        filters: newFilters,
      });
    },
    [removeAllTasks]
  );

  return {
    tasks,
    fetchNextPage,
    hasNextPage: !!newCursor,
    isLoading,
    isFetching,
    updateFilters,
  };
};
