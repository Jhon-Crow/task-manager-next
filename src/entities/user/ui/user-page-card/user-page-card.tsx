import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui";
import { TypeUser } from "../../model/types/user";
import { formatTimeToRuShort } from "@/shared/lib/format/formatDayToRuShort";
import { UserRoleIcon } from "@/entities/user/ui/users-icons/role-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar/avatar";
import { TaskList } from "@/entities/task";
import { TypeTask } from "@/entities/task/model/types/task";

export function UserPageCard({
  user,
}: {
  user: TypeUser & { tasks: TypeTask[] };
}) {
  return (
    <Card
      className="
        justify-center
        pl-4 mb-4
        "
    >
      <CardHeader>
        <Avatar className="size-40">
          <AvatarImage src={user.imageUrl || undefined} alt="user-avatar-img" />
          <AvatarFallback>
            {user.firstname[0]}
            {user.lastname ? user.lastname[0] : null}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="mt-4">
          {user.firstname} {user.lastname}
        </CardTitle>
        <CardDescription>{user.id}</CardDescription>
      </CardHeader>
      <CardContent
        className="flex
      justify-start
      gap-4 items-center"
      >
        <UserRoleIcon role={user.role} className="size-10" />
        {user.role}
      </CardContent>
      <CardFooter className="pt-4 flex-col gap-4">
        {user.tasks.length && <TaskList tasks={user.tasks} />}
        <span className="opacity-40 self-end">
          user created on {formatTimeToRuShort(user.createdAt)}
        </span>
      </CardFooter>
    </Card>
  );
}
