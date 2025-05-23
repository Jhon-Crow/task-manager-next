import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { DataTableForWidget } from "./data-table-for-widget";
import { TimerProvider } from "@/shared/providers";
import { TaskDataTableProvider } from "@/features/task-data-table-features";
import Count from "./count";

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
          <TaskDataTableProvider>
            <DataTableForWidget />
          </TaskDataTableProvider>
        </TimerProvider>
      </CardContent>
    </Card>
  );
};
