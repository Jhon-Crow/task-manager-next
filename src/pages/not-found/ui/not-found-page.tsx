"use client";

import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui";
import { usePathname } from "next/navigation";
import { Routes } from "@/shared/consts/paths";
import { LucideLink } from "lucide-react";

export default function NotFoundPage() {
  const pathname = usePathname()?.split("/");
  if (pathname?.[1] === "tasks") {
    return (
      <Card className="pl-4 mx-auto max-w-[500px]">
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl">
              Задача с id &quot;
              <span className="font-bold italic">{pathname?.[2]}</span>&quot; не
              найдена!
            </h2>
          </CardTitle>
        </CardHeader>
        <CardFooter className="ml-auto">
          <Button variant={"link"} asChild>
            <Link href={Routes.TASKS_LIST}>
              Вернуться к задачам
              <LucideLink />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  } else if (pathname?.[1] === "users") {
    return (
      <Card className="pl-4 mx-auto max-w-[500px]">
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl">
              Пользователь с id: &quot;
              <span className="font-bold italic">{pathname?.[2]}</span>&quot; не
              найден!
            </h2>
          </CardTitle>
        </CardHeader>
        <CardFooter className="ml-auto">
          <Button variant={"link"} className="p-0" asChild>
            <Link href={Routes.USERS_LIST}>
              Вернуться к списку пользователей
              <LucideLink />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="pl-4 mx-auto w-[500px]">
      <CardHeader>
        <CardTitle>
          <h2 className="text-xl">Не найдено!</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Запрошенный ресурс не обнаружен</p>
      </CardContent>
      <CardFooter className="ml-auto">
        <Button variant={"link"} asChild>
          <Link href={Routes.ROOT}>
            Вернуться на главную
            <LucideLink />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
