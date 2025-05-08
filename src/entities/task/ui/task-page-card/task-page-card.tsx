import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui";
import { TypeTask } from "../../model/types/task";
import { formatDateToRuShort } from "@/shared/lib/format/formatDayToRuShort";
import { TaskPriorityIcon } from "../tasks-icons/priority-icon";
import { TaskDifficultyIcon } from "../tasks-icons/difficulty-icon";
import { TypeUser } from "@/entities/user/types";
import Link from "next/link";
import { Routes } from "@/shared/consts/paths";
import { UserAvatar } from "@/entities/user";
import { cn } from "@/shared/lib/utils";
import { TaskCalendar } from "../task-calendar/task-calendar";

export function TaskPageCard({
  task,
  author,
  className,
  users,
}: {
  task: TypeTask;
  author?: TypeUser;
  className?: string;
  users?: Pick<TypeUser, "id" | "firstname" | "lastname" | "imageUrl">[];
}) {
  return (
    <Card className={cn("flex-row items-stretch", className)}>
      <div className="flex-col flex gap-y-5 min-h-full w-full">
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          {author && (
            <CardDescription className="mt-2">
              <Link
                href={Routes.USER(author.id)}
                className="flex items-center gap-x-4"
              >
                <UserAvatar user={author} />
                <div className="space-x-0.5">
                  {author.lastname && <span>{author.lastname}</span>}
                  <span>{author.firstname}</span>
                </div>
              </Link>
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>{task.description}</CardContent>

        <CardFooter className="mt-auto justify-between items-end">
          <div className="space-y-3">
            <div className="flex justify-end flex-row-reverse">
              {/* TODO multiple user */}
              {users?.map((user) => (
                <Link
                  key={user.id}
                  href={Routes.USER(user.id + "pizda")}
                  className="group flex items-center gap-x-2 hover:z-10 -mr-4 hover:pl-2.5 hover:pr-0.5 transition-all"
                >
                  <UserAvatar
                    user={user}
                    className="size-10 border-accent-foreground border-2 group-hover:scale-105 transition-transform"
                  />
                  <span className="flex-1 text-nowrap w-0 opacity-0 group-hover:opacity-100 group-hover:w-24 pointer-events-none group-hover:pointer-events-auto transition-all">
                    {user.firstname} {user.lastname}
                  </span>
                </Link>
              ))}
              {users?.map((user) => (
                <Link
                  key={user.id}
                  href={Routes.USER(user.id)}
                  className="group flex items-center gap-x-2 hover:z-10 -mr-4 hover:px-2 hover:mr-2 transition-all"
                >
                  <UserAvatar
                    user={user}
                    className="size-10 border-accent-foreground border-2 group-hover:scale-110 transition-transform"
                  />
                  <span className="flex-1 text-nowrap w-0 opacity-0 group-hover:opacity-100 group-hover:w-24 truncate pointer-events-none group-hover:pointer-events-auto transition-all">
                    {user.firstname} {user.firstname} {user.lastname}
                  </span>
                </Link>
              ))}
              {users?.map((user) => (
                <Link
                  key={user.id}
                  href={Routes.USER(user.id) + "hui"}
                  className="group flex items-center gap-x-2 hover:z-10 -mr-4 hover:mr-0.5 transition-all"
                >
                  <UserAvatar
                    user={user}
                    className="size-10 border-accent-foreground border-2 group-hover:scale-105 transition-transform"
                  />
                  <span className="flex-1 text-nowrap w-0 opacity-0 group-hover:opacity-100 group-hover:w-24 truncate pointer-events-none group-hover:pointer-events-auto transition-all">
                    {user.firstname} {user.firstname} {user.lastname}
                  </span>
                </Link>
              ))}
            </div>
            <div className="flex gap-x-4">
              <TaskPriorityIcon priority={task.priority} className="size-12" />
              <TaskDifficultyIcon
                difficult={task.difficulty}
                className="size-12"
              />
            </div>
          </div>
        </CardFooter>
      </div>
      <div className="h-full px-6">
        <TaskCalendar deadline={task.deadline} createdAt={task.createdAt} />
        <span className="block text-right mt-2">
          {formatDateToRuShort(task.createdAt)}
        </span>
      </div>
    </Card>
  );
}
