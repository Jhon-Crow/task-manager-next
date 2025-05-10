import { ReactNode } from "react";

export const TaskCardIconsWrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-x-4">{children}</div>
);
