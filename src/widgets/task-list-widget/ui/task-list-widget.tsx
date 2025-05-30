import { checkAuth } from "@/entities/auth";
import { TypeTask } from "@/entities/task/public-types";
import { TaskListCard } from "@/entities/task/ui/task-list-card/task-list-card";
import { TaskContextMenu } from "@/features/task-context-menu";
import { TimerProvider } from "@/shared/providers";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

export async function TaskListWidget({ tasks }: { tasks: TypeTask[] }) {
  const session = await checkAuth();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Список задач:</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TimerProvider>
          {tasks.map((task) => (
            <TaskContextMenu
              authorId={task.author.id}
              session={session}
              key={task.id}
              id={task.id}
              title={task.title}
            >
              <TaskListCard task={task} />
            </TaskContextMenu>
          ))}
        </TimerProvider>
      </CardContent>
    </Card>
  );
}
