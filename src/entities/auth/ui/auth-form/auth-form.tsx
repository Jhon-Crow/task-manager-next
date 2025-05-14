"use client";

import { Button, Input } from "@/shared/ui";
import { useActionState } from "react";
import { logIn } from "../../model/service/logIn/logIn";

export const AuthForm = () => {
  const [errors, dispatchAction] = useActionState(logIn, undefined);
  return (
    <form className="mx-auto w-[500px] space-y-6" action={dispatchAction}>
      <label htmlFor="email" className="block">
        <div>
          <h4>Емаил</h4>
          <Input id="email" name="email" type="email" />
        </div>
      </label>
      <label htmlFor="password" className="block">
        <div>
          <h4>Пароль</h4>
          <Input id="password" name="password" type="password" />
        </div>
      </label>
      {errors && <p>{errors.message}</p>}
      <Button type="submit">submit</Button>
    </form>
  );
};
