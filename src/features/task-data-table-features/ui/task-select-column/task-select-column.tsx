"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypeTaskColumns } from "@/entities/task/model/types/task";
import { Checkbox, DataTableSortingHeader } from "@/shared/ui";
import { useSession } from "next-auth/react";

export const selectInTaskDataTableColumn: ColumnDef<TypeTaskColumns> = {
    id: "select",
    accessorKey: "select",
    header: ({ table }) => {
        const session = useSession().data;
        const rows = table.getRowModel().rows;
        const hasAnySelectableRow = rows.some(row =>
            session?.user?.id === row.original.author.id ||
            session?.user?.role === 'ADMIN'
        );

        if (!hasAnySelectableRow) return null;

        const allSelectableSelected = rows.every(row => {
            const isSelectable = session?.user?.id === row.original.author.id ||
                session?.user?.role === 'ADMIN';
            if (!isSelectable) return true;
            return row.getIsSelected();
        });

        return (
            <Checkbox
                className="z-99"
                checked={allSelectableSelected}
                onCheckedChange={() => {
                    const shouldSelect = !allSelectableSelected;

                    rows.forEach(row => {
                        const isSelectable = session?.user?.id === row.original.author.id ||
                            session?.user?.role === 'ADMIN';
                        if (isSelectable && row.getIsSelected() !== shouldSelect) {
                            row.toggleSelected(shouldSelect);
                        }
                    });
                }}
                aria-label="Select all"
            />
        );
    },
    cell: ({ row }) => {
        const session = useSession().data;
        const showSelect = session?.user?.id === row.original.author.id ||
            session?.user?.role === 'ADMIN';

        if (!showSelect) return null;

        return (
            <Checkbox
                className="z-99"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        );
    },
    enableSorting: false,
    enableHiding: false,
};