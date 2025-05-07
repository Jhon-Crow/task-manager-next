"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui";
import { getBreadcrumbs } from "../routes/routes";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Navbar() {
  const pathname = usePathname();

  const [breadcrumbs, actions] = getBreadcrumbs(
    pathname?.slice(1) ? pathname.slice(1).split("/") : undefined
  );

  return (
    <Breadcrumb className="px-12 py-2">
      <BreadcrumbList>
        {breadcrumbs.map(({ name, path }, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <div key={name} className="flex items-center gap-2">
              {
                <BreadcrumbItem>
                  {!isLast ? (
                    <BreadcrumbLink href={path}>{name}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{name}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              }
              {!isLast && <BreadcrumbSeparator />}
            </div>
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
                      key={name}
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
