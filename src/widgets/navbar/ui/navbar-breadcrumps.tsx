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
import Link from "next/link";
import { NavbarBreadcrump } from "./navbar-breadcrump";
import { useSelectCurrentPage } from "@/shared/lib/slices/currentPage";
import { usePathname } from "next/navigation";
import { getBreadcrumbs } from "../routes/routes";
import { SignOutButton } from "@/entities/auth";
import { Routes } from "@/shared/consts/paths";

export const NavbarBreadcrumps = () => {
  const pathname = usePathname();
  const currentPage = useSelectCurrentPage();
  const [breadcrumbs, actions] = getBreadcrumbs(
    currentPage,
    pathname?.slice(1) ? pathname.slice(1).split("/") : undefined
  );

  return (
    <>
      <Breadcrumb className=" py-2">
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
      {!pathname?.includes(Routes.LOGIN) && <SignOutButton />}
    </>
  );
};
