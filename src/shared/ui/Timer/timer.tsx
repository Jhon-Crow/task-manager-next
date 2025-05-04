"use client";

import { useTimerContext } from "@/shared/hooks/useTimerContext";
import { formatTimer } from "@/shared/lib/format/formatTimer";

export function Timer({ end }: { end: number }) {
  const now = useTimerContext();
  const timerStr = formatTimer(end - now);
  return timerStr && <div>{timerStr}</div>;
}
