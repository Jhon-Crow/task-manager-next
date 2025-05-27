'use client'
import React from 'react';
import {DataTableV2} from "@/shared/ui";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";

export function UsersDataTable({data}) {


    const columns = Object.keys(data[0]).map((k) => ({
        accessorKey: k,
        header: k.charAt(0).toUpperCase() + k.slice(1), // Заглавная первая буква
        cell: ({ row }) => {
            let rowValue = row.getValue(k);
            if (typeof rowValue !== 'string') rowValue = '';
            return (
                <div className="capitalize">
                    {rowValue}
                </div>
            )
        },
    })).slice(1);

    const table = useReactTable({
        data,
        columns,
        // onSortingChange: setSorting,
        // onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        // onColumnVisibilityChange: setColumnVisibility,
        // onRowSelectionChange: setRowSelection,
        // state: {
        //     sorting,
        //     columnFilters,
        //     columnVisibility,
        //     rowSelection,
        // },
    })
    return (
        // <div></div>
        <DataTableV2 table={table}/>
    );
}

