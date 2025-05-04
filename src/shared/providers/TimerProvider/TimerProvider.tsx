"use client";

import { TimerContext } from "@/shared/contexts";
import { useState, useEffect, ReactNode } from "react";

export const TimerProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date().getTime());
    });
    return () => clearInterval(timer);
  }, []);
  return now && <TimerContext value={{ now }}>{children}</TimerContext>;
};
