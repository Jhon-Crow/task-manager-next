'use client'
import React from 'react';
import {Checkbox, DataTableV2} from "@/shared/ui";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";

export function UsersDataTable({data, setSelectedUser}) {


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
    })).slice(1)
        .unshift(
    //     {
    //         id: "select",
    //         header: ({ table }) => (
    //             <Checkbox
    //                 checked={
    //                     table.getIsAllPageRowsSelected() ||
    //                     (table.getIsSomePageRowsSelected() && "indeterminate")
    //                 }
    //                 onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //                 aria-label="Select all"
    //             />
    //         ),
    //         cell: ({ row }) => (
    //             <Checkbox
    //                 checked={row.getIsSelected()}
    //                 onCheckedChange={(value) => row.toggleSelected(!!value)}
    //                 aria-label="Select row"
    //             />
    //         ),
    //         enableSorting: false,
    //         enableHiding: false,
    //     },
    );

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
        state: {
        //     sorting,
        //     columnFilters,
        //     columnVisibility,
        //     rowSelection,
        },
    })
    return (
        // <div></div>
        <DataTableV2 table={table}/>
    );
}

