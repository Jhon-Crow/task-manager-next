import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui";
import { TypeUser } from "../../types";
import Link from "next/link";
import { Routes } from "@/shared/routes/paths";
import { UserRoleIcon } from "@/entities/user/ui/users-icons/role-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";
import { ReactNode } from "react";
import { StopPropagationDiv } from "@/shared/lib/utils";

export const UserListCard = ({
  user,
  actions,
}: {
  user: TypeUser;
  actions?: ReactNode;
}) => {
  return (
    <Link href={Routes.USER(user.id)} className="block">
      <Card className="relative group flex-row justify-between items-center hover:scale-101 transition-transform shadow-lg delay-100 duration-200 ease-in">
        <CardHeader className="w-[400px] relative flex items-center">
          <Avatar>
            {user.imageUrl && (
              <AvatarImage src={user.imageUrl} alt="user-avatar-img" />
            )}
            <AvatarFallback>
              {user.firstname[0]}
              {user.lastname ? user.lastname[0] : null}
            </AvatarFallback>
          </Avatar>
          <div className="ml-1 flex-row">
            <CardTitle className="text-nowrap">
              {user.firstname} {user.lastname}
            </CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex items-center gap-x-5">
          <div className="flex gap-x-2">
            <UserRoleIcon role={user.role} className="size-8 p-1" />
            <StopPropagationDiv>{actions}</StopPropagationDiv>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
