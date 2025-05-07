import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Timer,
} from "@/shared/ui";
import { TypeTask } from "../../public-types";
import Link from "next/link";
import { Routes } from "@/shared/consts/paths";
import { TaskPriorityIcon } from "../tasks-icons/priority-icon";
import { TaskDifficultyIcon } from "../tasks-icons/difficulty-icon";

export const TaskListCard = ({ task }: { task: TypeTask }) => {
  const now = new Date();
  const left = task.deadline.getTime() - now.getTime();
  const fullTime = task.deadline.getTime() - task.createdAt.getTime();
  const percent = ((fullTime - left) / fullTime) * 100;

  return (
    <Link href={Routes.TASK(task.id)} className="block">
      <Card className="relative overflow-hidden group flex-row justify-between items-center hover:scale-101 transition-transform shadow-lg delay-100 duration-200 ease-in">
        <CardHeader className="w-[400px] relative">
          <CardTitle className="text-nowrap">{task.title}</CardTitle>
          {task.description && (
            <>
              <CardDescription
                className="
              min-h-[40px]
              line-clamp-2
              group-hover:line-clamp-3
              transition-[line-clamp] duration-300 ease-in-out
              "
              >
                {task.description}
              </CardDescription>
              <div
                className="
                    absolute inset-x-0 bottom-0 h-1/2 
                    bg-gradient-to-t from-card via-card/80 
                    pointer-events-none
                    group-hover:opacity-0 
                    transition-opacity duration-300
              "
              />
            </>
          )}
        </CardHeader>
        <CardContent className="flex items-center gap-x-5">
          <Timer end={task.deadline.getTime()} />
          {(task.priority || task.difficulty) && (
            <div className="flex gap-x-2">
              {task.priority && (
                <TaskPriorityIcon
                  priority={task.priority}
                  className="size-8 p-1"
                />
              )}
              {task.difficulty && (
                <TaskDifficultyIcon
                  difficult={task.difficulty}
                  className="size-8 p-1"
                />
              )}
            </div>
          )}
        </CardContent>
        <Progress percent={`${percent >= 100 ? 100 : percent}%`} />
      </Card>
    </Link>
  );
};

const Progress = ({ percent }: { percent: string }) => {
  return (
    <div
      className={`absolute left-0 top-0 bottom-0 bg-muted-foreground/10`}
      style={{ width: percent }}
    />
  );
};
