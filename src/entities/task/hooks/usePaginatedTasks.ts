"use client";

// import { useGetInfinityTaskQuery } from "../api/taskApi";
// import { TasksFilters } from "../public-types";
// import { useSelectAllTasks } from "../model/selectors/selectTaskList";
// import { useTasksListActions } from "../model/slices/tasksListSlice";
// import { useEffect, useRef } from "react";
//
// export const usePaginatedTasks = (params: {
//     filters: TasksFilters;
//     page: number;
//     pageSize: number;
// }) => {
//     const { filters, page, pageSize } = params;
//     const tasks = useSelectAllTasks();
//     const { addTasks, removeAllTasks } = useTasksListActions();
//
//     const prevParamsRef = useRef({ filters, page, pageSize });
//     // todo написать нормальный запрос, возвращать нужные данные в тч кол-во энтети в бд
//     // Используем существующий хук бесконечного скролла
//     const { data, isLoading, isFetching } = useGetInfinityTaskQuery(
//         {
//             filters,
//             pageSize: pageSize,
//             // Эмулируем "курсор" через смещение
//             cursor: page > 1 ? `page_${page}` : undefined
//         },
//         {
//             selectFromResult: ({ data, ...rest }) => ({
//                 data: {
//                     tasks: data?.tasks ?? [],
//                     // Для простоты считаем что всегда есть следующая страница
//                     totalPages: 100
//                 },
//                 ...rest,
//             }),
//         }
//     );
//
//     useEffect(() => {
//         const prevParams = prevParamsRef.current;
//         const paramsChanged = (
//             prevParams.filters !== filters ||
//             prevParams.page !== page ||
//             prevParams.pageSize !== pageSize
//         );
//
//         if (!paramsChanged || !data) return;
//
//         // Для первой страницы очищаем, для последующих - добавляем
//         if (page === 1) {
//             removeAllTasks();
//         }
//         addTasks(data.tasks);
//
//         prevParamsRef.current = { filters, page, pageSize };
//     }, [data, filters, page, pageSize, addTasks, removeAllTasks]);
//
//     return {
//         tasks,
//         totalPages: data?.totalPages || 1,
//         isLoading,
//         isFetching,
//     };
// };

import {TasksFilters} from "@/entities/task/model/types/api";
import {useCallback, useEffect, useState} from "react";
import {useSelectAllTasks} from "@/entities/task/model/selectors/selectTaskList";
import {TypeTask} from "@/entities/task/model/types/task";
import {useGetInfinityTaskQuery, useTasksListActions} from "@/entities/task";
import {useGetPaginatedTaskQuery} from "@/entities/task/api/taskApi";

// export const usePaginatedTasks = (params: {
//     page: number;
//     initialFilters: TasksFilters;
//     pageSize?: number;
// }) => {
//     const [newParams, setNewParams] = useState({
//         pageSize: 10,
//         nextPageIndex: undefined as number | undefined,//todo надеюсь то, то что в парамсы
//         // cursor: undefined as string | undefined,
//         filters: params.initialFilters,
//     });
//     // const tasks = useSelectAllTasks(); //получить все из редакс
//     const tasks = useSelectAllTasks(); //получить все из редакс
//     const [newPage, setNewPage] = useState(undefined);
//     // const [newCursor, setNewCursor] = useState<TypeTask["id"] | null | undefined>(
//     //     undefined
//     // );
//     const { addTasks, removeAllTasks } = useTasksListActions();
//
//     // const { data, isLoading, isFetching } = useGetInfinityTaskQuery(newParams, {
//     //     selectFromResult: ({ data, ...rest }) => ({
//     //         data: { tasks: data?.tasks ?? [], nextCursor: data?.nextCursor },
//     //         ...rest,
//     //     }),
//     // });
//
//     const {data, isLoading, isFetching} = useGetPaginatedTaskQuery(newParams, {
//         selectFromResult: ({data, ...rest}) => ({
//             data: {tasks: data?.tasks ?? [], nextPage: data?.currentPage},
//             ...rest,
//         }),
//     });
//
//     useEffect(() => {
//         if (data && newPage !== null && newPage !== data.currentPage) {
//             addTasks(data.tasks);
//             setNewPage(data.currentPage || null);
//             console.log(data.currentPage);
//         }
//         console.log(newPage)
//     }, [addTasks, data, newPage]);
//
//     const fetchNextPage = useCallback(() => {
//         setNewParams((prev) => ({
//             ...prev,
//             nextPageIndex: newPage ? newPage : undefined,
//             //todo page params? : newCursor ? newCursor : undefined,
//         }));
//     }, [newPage]);
//
//     const updateFilters = useCallback(
//         (newFilters: TasksFilters) => {
//             removeAllTasks();
//             setNewPage(null);
//             setNewParams({
//                 pageSize: 10,
//                 nextPageIndex: undefined,
//                 filters: newFilters,
//             });
//         },
//         [removeAllTasks]
//     );
//     console.log(tasks)
//     return {
//         tasks,
//         fetchNextPage,
//         hasNextPage: !! newPage,
//         isLoading,
//         isFetching,
//         updateFilters,
//     };
// };

export const usePaginatedTasks = (params: {
    page: number;
    initialFilters: TasksFilters;
    pageSize?: number;
}) => {
    console.log(params.page)
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

    console.log(newCursor)
    return {
        tasks,
        fetchNextPage,
        hasNextPage: !!newCursor,
        isLoading,
        isFetching,
        updateFilters,
    };
};