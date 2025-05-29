'use client'
import React, { useState, useEffect } from 'react';
import { Checkbox, DataTableV2 } from "@/shared/ui";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";

export function UsersDataTable({ data, setSelectedUser }) {
    const [rowSelection, setRowSelection] = useState({});

    useEffect(() => {
        setRowSelection({});
    }, [data]);

    useEffect(() => {
        if (!setSelectedUser) return;

        const selectedRowIndices = Object.keys(rowSelection);
        const selectedUsers = selectedRowIndices.map(index => data[parseInt(index)]);
        setSelectedUser(selectedUsers);
    }, [rowSelection, data, setSelectedUser]);

    const columns = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={value => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        ...Object.keys(data[0] ?? {}).map(k => ({
            accessorKey: k,
            header: k.charAt(0).toUpperCase() + k.slice(1),
            cell: ({ row }) => (
                <div className="capitalize">
                    {String(row.getValue(k))}
                </div>
            )
        }))
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    });

    return <DataTableV2 table={table} />;
}