"use client";

import { useContext } from "react";
import { TimerContext } from "../contexts";

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error(
      "Хук useTimerContext должен использоваться внутри провайдера TimerProvider"
    );
  }
  return context.now;
};
