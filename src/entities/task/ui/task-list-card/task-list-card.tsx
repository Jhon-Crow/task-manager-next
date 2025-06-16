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
import { Routes } from "@/shared/routes/paths";
import { TaskPriorityIcon } from "../tasks-icons/priority-icon";
import { TaskDifficultyIcon } from "../tasks-icons/difficulty-icon";
import {TaskListCardProgress} from "./task-list-card-progress";

export const TaskListCard = ({ task }: { task: TypeTask }) => {
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
        <TaskListCardProgress task={task}/>
      </Card>
    </Link>
  );
};
