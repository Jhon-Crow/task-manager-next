import { TypeDifficultTask } from "../../model/types/task";
import { SignalHigh, SignalLow, SignalMedium } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export function TaskDifficultyIcon({
  difficult,
  className,
}: {
  difficult: TypeDifficultTask;
  className?: string;
}) {
  switch (difficult) {
    case "HARD":
      return (
        <SignalHigh
          className={cn(
            "text-red-600 p-2 bg-red-300/25 rounded-full",
            className
          )}
        />
      );
    case "MIDDLE":
      return (
        <SignalMedium
          className={cn(
            "text-amber-600 p-2 bg-amber-300/25 rounded-full",
            className
          )}
        />
      );
    case "EASY":
      return (
        <SignalLow
          className={cn(
            "text-green-600 p-2 bg-green-300/25 rounded-full",
            className
          )}
        />
      );
    default:
      return null;
  }
}
