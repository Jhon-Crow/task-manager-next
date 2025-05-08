import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";
import { TypeUser } from "../../types";

export function UserAvatar({
  className,
  user,
}: {
  className?: string;
  user: Pick<TypeUser, "imageUrl" | "firstname" | "lastname">;
}) {
  return (
    <Avatar className={className}>
      <AvatarImage src={user.imageUrl || undefined} alt="user-avatar-img" />
      <AvatarFallback>
        {user.firstname[0]}
        {user.lastname ? user.lastname[0] : null}
      </AvatarFallback>
    </Avatar>
  );
}
