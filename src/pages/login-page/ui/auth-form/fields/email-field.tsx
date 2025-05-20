"use client";

import { useBackgroundContext } from "@/pages/login-page/hook/useBackgroundContext";
import { Input } from "@/shared/ui";

export const EmailField = () => {
  const { setIsFocused } = useBackgroundContext();
  return (
    <label htmlFor="email" className="block space-y-4">
      <h4 className="font-bold">Почтовый адрес</h4>
      <Input
        id="email"
        name="email"
        type="email"
        onBlur={() => {
          setIsFocused(null);
        }}
        onFocus={() => {
          setIsFocused("email");
        }}
      />
    </label>
  );
};
