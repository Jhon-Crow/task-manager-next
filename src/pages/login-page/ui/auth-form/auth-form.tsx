"use client";

import { Button } from "@/shared/ui";
import { useActionState, useEffect } from "react";
import { logIn } from "@/entities/auth";
import { EmailField } from "./fields/email-field";
import { PasswordField } from "./fields/password-field";
import { useFormStatus } from "react-dom";
import { useBackgroundContext } from "../../hook/useBackgroundContext";

export const AuthForm = () => {
  const [errors, dispatchAction] = useActionState(logIn, undefined);
  return (
    <form className="mx-auto space-y-6" action={dispatchAction}>
      <EmailField />
      <PasswordField />
      {errors && errors.message}
      <SubmitBtn />
    </form>
  );
};

function SubmitBtn() {
  const { pending } = useFormStatus();
  const { setIsFocused } = useBackgroundContext();

  useEffect(() => {
    setIsFocused(pending ? "submit" : null);
  }, [pending, setIsFocused]);
  return (
    <Button disabled={pending} className="mt-16 ml-auto block" type="submit">
      Авторизоваться
    </Button>
  );
}
