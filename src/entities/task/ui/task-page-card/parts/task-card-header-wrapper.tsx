import { CardHeader } from "@/shared/ui";
import { ReactNode } from "react";

export const TaskCardHeaderWrapper = ({
  children,
}: {
  children: ReactNode;
}) => <CardHeader>{children}</CardHeader>;
