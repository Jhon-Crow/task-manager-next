import { ReactNode } from "react";

export const TaskCardInfoWrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-y-5 min-h-full w-full">{children}</div>
);
