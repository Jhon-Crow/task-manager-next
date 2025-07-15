"use client";

import {
    ColumnDef,
    getCoreRowModel, getPaginationRowModel,
    getSortedRowModel,
    RowSelectionState,
    SortingState,
    TableOptions,
    useReactTable,
} from "@tanstack/react-table";
import {ReactNode, useCallback, useEffect, useMemo, useRef, useState,} from "react";
import {TasksFilters, TypeTask, TypeTaskColumns} from "@/entities/task/public-types";
import {taskDataDefaultColumns, useInfinityTasks, usePaginatedTasks, useTasksListActions} from "@/entities/task";
import {taskDataTableMenuInColumns, taskDataTableSortingInColumns} from "../";
import {TasksDataTableContext} from "../contexts/TasksDataTableContext";

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
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filters, setFilters] = useState<TasksFilters>({});
    // const [totalTasksCount, setTotalTasksCount] = useState(undefined);
    const { setSelectedTasks} = useTasksListActions();
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });

    const { tasks, isFetching, isLoading, fetchNextPage, totalTasks } =
        usePaginatedTasks({
            // page: pagination.pageIndex,
            initialFilters: filters,
            pageSize: 10,
        });

    const nextPageButtonHandler = useCallback(() => {
            fetchNextPage();
    },[fetchNextPage])
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
        ) as ColumnDef<TypeTask, any>[];
    }, [addColumns, shiftColumns]);


    const table = useReactTable({
        rowCount: totalTasks,
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
        data: tasks,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        getRowId: (row) => row.id,
        // initialState: {
        //     pagination: {
        //         pageIndex: 0,
        //         pageSize: 10
        //     }
        // },
        state: {
            pagination,
            sorting,
            rowSelection,
        },
        enableRowSelection: true,
        ...options,
    });

    const selectedTasks = useMemo(() => {
        return table.getSelectedRowModel().flatRows.map(row => row.original);
    }, [rowSelection, tasks]);

    useEffect(() => {
        const selectedIds = Object.keys(rowSelection);
        setSelectedTasks(selectedIds);
    }, [rowSelection, setSelectedTasks]);

    const { rows } = table.getRowModel();

    // useEffect(() => {
    //         nextPageButtonHandler();
    //     },
    //     [pagination.pageIndex]
    // );

    const value = useMemo(
        () => ({
            table,
            setSorting,
            setFilters,
            setPagination,
            pagination,
            rows,
            isLoading: isFetching || isLoading,
            selectedTasks,
            setRowSelection,
        }),
        [isFetching, isLoading, rows, table, selectedTasks]
    );

    return (
        <TasksDataTableContext value={value}>{children}</TasksDataTableContext>
    );
}