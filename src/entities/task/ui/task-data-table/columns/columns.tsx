"use client";

import type { TypeTaskWorker } from "@/entities/task/public-types";
import { formatDateToRuShort } from "@/shared/lib/format/formatDayToRuShort";
import { Timer, Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui";
import type { ColumnDef } from "@tanstack/react-table";
import { UserAvatar } from "@/entities/user";
import Link from "next/link";
import { Routes } from "@/shared/consts/paths";
import { TypeUser } from "@/entities/user/types";
import { cn } from "@/shared/lib/utils";
import { Crown } from "lucide-react";
import { TypeTaskColumns } from "@/entities/task/model/types/task";

export const taskDataDefaultColumns: Partial<
  Record<keyof TypeTaskColumns, ColumnDef<TypeTaskColumns>>
> = {
  title: {
    accessorKey: "title",
    header: "Название",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="max-w-24 block truncate">{title}</span>
          </TooltipTrigger>
          <TooltipContent>{title}</TooltipContent>
        </Tooltip>
      );
    },
  },
  description: {
    accessorKey: "description",
    header: "Описание",
    cell: ({ row }) => {
      const text = row.getValue("description") as string;
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="max-w-20 block overflow-hidden truncate">
              {text}
            </span>
          </TooltipTrigger>
          <TooltipContent>{text}</TooltipContent>
        </Tooltip>
      );
    },
  },
  author: {
    accessorKey: "author",
    header: "Автор",
    cell: ({ row }) => {
      const author = row.getValue("author") as TypeUser;
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={Routes.USER(author.id)}>
              <UserAvatar
                user={author}
                key={author.id}
                className={cn("border-accent-foreground border-2 shadow-2xs", {
                  ["border-amber-400"]: author.role === "ADMIN",
                })}
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="flex gap-2 items-center">
            {author.role === "ADMIN" && <Crown className="text-amber-400" />}{" "}
            {author.firstname} {author.lastname}
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  workers: {
    accessorKey: "workers",
    header: "Выполняют",
    cell: ({ row }) => {
      const workers = row.getValue("workers") as TypeTaskWorker[];

      return (
        <div className="flex -space-x-2">
          {workers.map((worker) => (
            <Tooltip key={worker.id}>
              <TooltipTrigger asChild>
                <Link href={Routes.USER(worker.id)}>
                  <UserAvatar
                    user={worker}
                    key={worker.id}
                    className="border-accent-foreground border-1 shadow-2xs"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                {worker.firstname} {worker.lastname}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      );
    },
  },
  deadline: {
    accessorKey: "deadline",
    header: "Дедлайн",
    cell: ({ row }) => {
      return <Timer end={new Date(row.getValue("deadline")).getTime()} />;
    },
  },
  createdAt: {
    accessorKey: "createdAt",
    header: "Создана",
    cell: ({ row }) => {
      return formatDateToRuShort(new Date(row.getValue("createdAt")));
    },
  },
};
