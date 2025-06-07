'use client'


import {ColumnDef} from "@tanstack/react-table";
import {TypeTaskColumns} from "@/entities/task/model/types/task";
import {Checkbox, DataTableSortingHeader} from "@/shared/ui";

export const completedInTaskDataTableColumn: ColumnDef<TypeTaskColumns> = {
    id: 'completed',
        accessorKey: "completed",
        header: (props) => <DataTableSortingHeader {...props} title="Статус" />,
        cell: ({ row }) => {
            return (
                <div className="flex justify-center">
                    <Checkbox
                        checked={row.getValue("completed")}
                        aria-label="Выполнено"
                        className="pointer-events-none"
                    />
                </div>
            );
        },
}



