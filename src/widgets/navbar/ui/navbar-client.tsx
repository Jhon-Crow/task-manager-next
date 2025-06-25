"use client";

import { NavbarBreadcrumps } from "./navbar-breadcrumps";
import { ToggleTheme } from "@/features/theme-toggle";
import { NavbarSignout } from "./navbar-signout";
import { Session } from "next-auth";
import { useStickyHeader } from "../hook/useStickyHeader";
import { useRef } from "react";
import { cn } from "@/shared/lib/utils";

export function NavbarClient({
  session,
  className,
}: {
  session: Session;
  className?: string;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isSticky = useStickyHeader(headerRef);
  return (
    <header
      ref={headerRef}
      data-sticky={isSticky}
      className={cn(
        "w-full fixed top-0 py-2 flex justify-between px-12 transition-[backdrop-filter, box-shadow] ease-in-out data-[sticky=true]:backdrop-blur-sm data-[sticky=true]:shadow-2xl z-99",
        className
      )}
    >
      <NavbarBreadcrumps />
      <div className="flex items-center gap-x-4">
        <NavbarSignout session={session} />
        <ToggleTheme className="" />
      </div>
    </header>
  );
}
