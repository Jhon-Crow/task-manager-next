import { TypeTask } from "../../../model/types/task";
import { UserAvatar } from "@/entities/user";
import { Routes } from "@/shared/routes/paths";
import { CardDescription } from "@/shared/ui";
import Link from "next/link";

export const TaskCardAuthor = ({ author }: { author: TypeTask["author"] }) => {
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
