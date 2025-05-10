"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui";
import { getBreadcrumbs } from "../routes/routes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSelectCurrentPage } from "@/shared/lib/slices/currentPage";
import { NavbarBreadcrump } from "./navbar-breadcrump";

export function Navbar() {
  const pathname = usePathname();
  const currentPage = useSelectCurrentPage();
  const [breadcrumbs, actions] = getBreadcrumbs(
    currentPage,
    pathname?.slice(1) ? pathname.slice(1).split("/") : undefined
  );

  return (
    <Breadcrumb className="px-12 py-2">
      <BreadcrumbList>
        {breadcrumbs.map(({ path, name, type }, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <NavbarBreadcrump
              key={path}
              path={path}
              name={name}
              type={type}
              isLast={isLast}
            />
          );
        })}
        {actions.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <BreadcrumbEllipsis className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {actions.map(({ name, path }) => (
                    <Link
                      href={pathname + path}
                      key={path}
                      className="cursor-pointer"
                    >
                      <DropdownMenuItem>{name}</DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
