"use client";

import { Button } from "@/shared/ui";
import { logOut } from "../../model/service/logOut/logOut";
import { useTransition } from "react";

export const SignOutButton = () => {
  const [pending, startTranstion] = useTransition();
  return (
    <Button
      disabled={pending}
      onClick={() => {
        startTranstion(async () => {
          await logOut();
        });
      }}
    >
      Выйти
    </Button>
  );
};
