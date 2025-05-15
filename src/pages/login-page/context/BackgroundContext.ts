import { createContext } from "react";

export type Focus = "email" | "password" | "submit" | null;

type BackgroundContextValue = {
  isFocused: Focus;
  setIsFocused: (arg: Focus) => void;
};

export const BackgroundContext = createContext<BackgroundContextValue | null>(
  null
);
