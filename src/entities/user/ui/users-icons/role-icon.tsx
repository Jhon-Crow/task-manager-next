import {Crown, Speech} from "lucide-react";
import {TypeRoleUser} from "../../model/types/user";
import {cn} from "@/shared/lib/utils";

export function UserRoleIcon({
  role,
  className,
}: {
  role: TypeRoleUser;
  className?: string;
}) {
  switch (role) {
    case "ADMIN":
      return (
        <Crown
          className={cn(
            "text-red-600 p-2 bg-red-300/25 rounded-full",
            className
          )}
        />
      );
    case "MANAGER":
      return (
        <Speech
          className={cn(
            "text-amber-600 p-2 bg-amber-300/25 rounded-full",
            className
          )}
        />
      );
    case "WORKER":
      return null;
    default:
      return null;
  }
}
