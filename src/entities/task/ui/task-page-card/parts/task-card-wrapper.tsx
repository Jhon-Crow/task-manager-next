import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui";
import { ReactNode } from "react";

export const TaskCardWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <Card
    className={cn(
      "flex-row items-stretch max-w-[660px] min-w-[660px]",
      className
    )}
  >
    {children}
  </Card>
);
