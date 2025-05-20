import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { DataTableForWidget } from "./data-table-for-widget";
import { TimerProvider } from "@/shared/providers";
import { TaskDataTableSortingProvider } from "@/features/task-data-table-features";

export const TaskListDataTableWidget = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Задачи</CardTitle>
      </CardHeader>
      <CardContent>
        <TimerProvider>
          <TaskDataTableSortingProvider>
            <DataTableForWidget />
          </TaskDataTableSortingProvider>
        </TimerProvider>
      </CardContent>
    </Card>
  );
};
