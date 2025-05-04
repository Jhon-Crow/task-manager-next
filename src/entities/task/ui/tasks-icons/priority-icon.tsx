import { Bird, Rabbit, Turtle } from "lucide-react";
import { TypePriorityTask } from "../../model/types/task";
import { cn } from "@/shared/lib/utils";

export function TaskPriorityIcon({
  priority,
  className,
}: {
  priority: TypePriorityTask;
  className?: string;
}) {
  switch (priority) {
    case "HIGH":
      return (
        <Rabbit
          className={cn(
            "text-red-600 p-2 bg-red-300/25 rounded-full",
            className
          )}
        />
      );
    case "AVERAGE":
      return (
        <Bird
          className={cn(
            "text-amber-600 p-2 bg-amber-300/25 rounded-full",
            className
          )}
        />
      );
    case "LOW":
      return (
        <Turtle
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
