"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { AuthForm } from "./auth-form/auth-form";
import { useBackgroundContext } from "../hook/useBackgroundContext";
import { cn } from "@/shared/lib/utils";

export default function LoginPage() {
  const { isFocused } = useBackgroundContext();
  return (
    <Card
      className={cn("w-[400px] transition-all duration-1000 ease-out", {
        ["scale-105 shadow-2xl"]: isFocused,
        ["-translate-y-2"]: isFocused === "email",
        ["-translate-y-24"]: isFocused === "password",
      })}
    >
      <CardHeader>
        <CardTitle className="text-2xl">Авторизация</CardTitle>
      </CardHeader>
      <CardContent>
        <AuthForm />
      </CardContent>
    </Card>
  );
}
