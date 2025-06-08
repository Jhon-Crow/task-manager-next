"use client";

import { SignOutButton } from "@/entities/auth";
import { UserAvatar } from "@/entities/user";
import { Routes } from "@/shared/routes/paths";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

export function NavbarSignout({ session }: { session: Session }) {
  const pathname = usePathname();
  return (
    !pathname?.includes(Routes.LOGIN) && (
      <div className="flex items-center">
        <UserAvatar
          user={{
            ...session.user,
            lastname: session.user.lastname || null,
            imageUrl: session.user.image || null,
          }}
        />
        <span className="ml-2 text-xs">
          {session.user.lastname
            ? session.user.lastname + " "
            : "" + session.user.firstname}
        </span>
        <SignOutButton />
      </div>
    )
  );
}
