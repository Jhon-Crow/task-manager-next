import { ReactNode } from "react";

export default function TaskListPageLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <div className="mx-auto w-[800px] mt-8">{children}</div>;
}
