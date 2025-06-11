import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { DataTableForWidget } from "./data-table-for-widget";
import { TimerProvider } from "@/shared/providers";
import { TaskDataTableProvider } from "@/features/task-data-table-features";
import Count from "./count";
import {
    selectInTaskDataTableColumn
} from "@/features/task-data-table-features/ui/task-select-column/task-select-column";
import {TypeTaskColumns} from "@/entities/task/model/types/task";
import {ColumnDef} from "@tanstack/react-table";
import {
    completedInTaskDataTableColumn
} from "@/features/task-data-table-features/ui/task-completed-sorting-column/task-completed-sorting-column";

export const TaskListDataTableWidget = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Задачи <Count />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TimerProvider>
          <TaskDataTableProvider
              shiftColumns={{
                  // select: selectInTaskDataTableColumn as ColumnDef<TypeTaskColumns>,
                  completed: completedInTaskDataTableColumn as ColumnDef<TypeTaskColumns>
              }}>
            <DataTableForWidget />
          </TaskDataTableProvider>
        </TimerProvider>
      </CardContent>
    </Card>
  );
};
