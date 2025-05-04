import { createContext } from "react";

type TimerContextValue = {
  now: number;
};

export const TimerContext = createContext<TimerContextValue | null>(null);
