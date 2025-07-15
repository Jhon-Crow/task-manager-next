"use client";



import {TasksFilters} from "@/entities/task/model/types/api";
import {useCallback, useEffect, useState} from "react";
import {useSelectAllTasks} from "@/entities/task/model/selectors/selectTaskList";
import {TypeTask} from "@/entities/task/model/types/task";
import {useGetInfinityTaskQuery, useTasksListActions} from "@/entities/task";


export const usePaginatedTasks = (params: {
    // page: number;
    initialFilters: TasksFilters;
    pageSize?: number;
}) => {
    // console.log(params.page)
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
            data: {
                tasks: data?.tasks ?? [],
                nextCursor: data?.nextCursor,
                totalTasks: data?.totalTasks
            },
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

    console.log(newCursor, !!newCursor)
    return {
        totalTasks: data?.totalTasks,
        tasks,
        fetchNextPage,
        hasNextPage: !!newCursor,
        isLoading,
        isFetching,
        updateFilters,
    };
};