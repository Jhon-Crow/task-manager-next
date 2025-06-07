'use client'


import {ColumnDef} from "@tanstack/react-table";
import {TypeTaskColumns} from "@/entities/task/model/types/task";
import {DataTableSortingHeader} from "@/shared/ui";
import {Check, X} from "lucide-react";

export const completedInTaskDataTableColumn: ColumnDef<TypeTaskColumns> = {
    id: 'completed',
        accessorKey: "completed",
        header: (props) => <DataTableSortingHeader {...props} title="Статус" />,
        cell: ({ row }) => {
        const completed = row.getValue("completed");
            return (
                <div className="flex justify-center">
                    {completed === true
                        ? <Check/>
                        : (completed === false ? <X /> : null)
                    }
                </div>
            );
        },
}



