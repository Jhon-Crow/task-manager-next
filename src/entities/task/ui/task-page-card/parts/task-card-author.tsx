import { UserAvatar } from "@/entities/user";
import { TypeUser } from "@/entities/user/types";
import { Routes } from "@/shared/consts/paths";
import { CardDescription } from "@/shared/ui";
import Link from "next/link";

export const TaskPageAuthorField = ({ author }: { author: TypeUser }) => {
  return (
    <CardDescription>
      <Link href={Routes.USER(author.id)} className="flex items-center gap-x-4">
        <UserAvatar user={author} />
        <span>
          {author.lastname} {author.firstname}
        </span>
      </Link>
    </CardDescription>
  );
};
