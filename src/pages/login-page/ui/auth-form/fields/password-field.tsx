"use client";

import { useBackgroundContext } from "@/pages/login-page/hook/useBackgroundContext";
import { Input } from "@/shared/ui";

export const PasswordField = () => {
  const { setIsFocused } = useBackgroundContext();
  return (
    <label htmlFor="password" className="block space-y-4">
      <h4 className="font-bold">Пароль</h4>
      <Input
        id="password"
        name="password"
        type="password"
        onBlur={() => {
          setIsFocused(null);
        }}
        onFocus={() => {
          setIsFocused("password");
        }}
      />
    </label>
  );
};
