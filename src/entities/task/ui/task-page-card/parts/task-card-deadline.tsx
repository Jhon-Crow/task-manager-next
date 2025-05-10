"use client";

import { Calendar } from "@/shared/ui";

export function TaskCardDeadline({
  deadline,
  createdAt,
}: {
  deadline: Date;
  createdAt: Date;
}) {
  return (
    <Calendar
      className="scale-80 h-56 translate-x-11 -translate-y-10"
      mode="single"
      fixedWeeks
      defaultMonth={deadline}
      fromMonth={createdAt}
      toMonth={deadline}
      selected={deadline}
      disabled={(date) => date <= createdAt || date >= deadline}
    />
  );
}
