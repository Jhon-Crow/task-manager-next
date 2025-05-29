'use client'
import React, {useEffect, useState} from 'react';
import {DataTableV2} from "@/shared/ui";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {columns} from "@/entities/user/consts/consts";

export function UsersDataTable({ data, setSelectedUser }) {

    const [rowSelection, setRowSelection] = useState({});

    useEffect(() => {
        setRowSelection({});
    }, [data]);

    useEffect(() => {
        if (!setSelectedUser) return;
        const selectedUsers = Object.keys(rowSelection).map(k => data[k].id);
        setSelectedUser(selectedUsers);
        console.log(selectedUsers)

    }, [rowSelection, data, setSelectedUser]);

    // console.log(data)

    const table = useReactTable({
        data,
        columns: Object.values(columns),
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    });

    return <DataTableV2 table={table} />;
}