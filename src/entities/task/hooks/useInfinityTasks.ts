"use client";

import { useCallback, useEffect, useState } from "react";
import { useGetInfinityTaskQuery } from "../api/taskApi";
import { TasksFilters, TypeTask } from "../public-types";

export const useInfinityTasks = (params: {
  initialFilters: TasksFilters;
  pageSize?: number;
}) => {
  const [newParams, setNewParams] = useState({
    pageSize: 10,
    cursor: undefined as string | undefined,
    filters: params.initialFilters,
  });
  const [allTasks, setAllTasks] = useState<TypeTask[]>([]);
  const [newCursor, setNewCursor] = useState<TypeTask["id"] | null | undefined>(
    undefined
  );

  const { data, isLoading, isFetching } = useGetInfinityTaskQuery(newParams, {
    selectFromResult: ({ data, ...rest }) => ({
      data: { tasks: data?.tasks ?? [], nextCursor: data?.nextCursor },
      ...rest,
    }),
  });

  useEffect(() => {
    if (data && newCursor !== null && newCursor !== data.nextCursor) {
      setAllTasks((prev) => [...prev, ...data.tasks]);
      setNewCursor(data.nextCursor || null);
    }
  }, [data, newCursor]);

  const fetchNextPage = useCallback(() => {
    console.log(newCursor);
    console.log(newCursor, !isFetching, !isLoading);

    setNewParams((prev) => ({
      ...prev,
      cursor: newCursor ? newCursor : undefined,
    }));
  }, [isFetching, isLoading, newCursor]);

  const updateFilters = useCallback((newFilters: TasksFilters) => {
    setAllTasks([]);
    setNewCursor(null);
    setNewParams({
      pageSize: 10,
      cursor: undefined,
      filters: newFilters,
    });
  }, []);

  return {
    tasks: allTasks,
    fetchNextPage,
    hasNextPage: !!newCursor,
    isLoading,
    isFetching,
    updateFilters,
  };
};
