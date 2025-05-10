import { CardContent } from "@/shared/ui";
import { ReactNode } from "react";

export const TaskCardDescription = ({
  description,
}: {
  description: ReactNode;
}) => {
  return (
    <CardContent className="max-w-[335px] overflow-hidden">
      {description}
    </CardContent>
  );
};
