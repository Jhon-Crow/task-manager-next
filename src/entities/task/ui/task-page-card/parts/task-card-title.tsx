import { CardTitle } from "@/shared/ui";
import { ReactNode } from "react";

export const TaskCardTitle = ({ title }: { title: ReactNode }) => {
  return <CardTitle className="truncate w-full">{title}</CardTitle>;
};
