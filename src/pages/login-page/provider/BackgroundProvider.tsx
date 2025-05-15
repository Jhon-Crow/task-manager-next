"use client";

import { ReactNode, useState } from "react";
import { BackgroundContext, Focus } from "../context/BackgroundContext";

export const BackgroundProvider = ({ children }: { children: ReactNode }) => {
  const [isFocused, setIsFocused] = useState<Focus>(null);
  return (
    <BackgroundContext value={{ isFocused, setIsFocused }}>
      {children}
    </BackgroundContext>
  );
};
