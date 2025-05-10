import { CardFooter } from "@/shared/ui";
import { ReactNode } from "react";

export const TaskCardFooterWrapper = ({
  children,
}: {
  children: ReactNode;
}) => (
  <CardFooter className="mt-auto flex-col items-start justify-between space-y-3">
    {children}
  </CardFooter>
);
