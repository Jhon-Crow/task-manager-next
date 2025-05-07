import { getTaskById, NewTaskProvider, TaskProvider } from "@/entities/task";
import { TypeTask } from "@/entities/task/public-types";
import { ReactNode } from "react";

export default async function TaskPageLayout({
  params,
  children,
}: {
  params: Promise<{ id: TypeTask["id"] }>;
  children: Readonly<ReactNode>;
}) {
  const { id } = await params;
  const data = await getTaskById(id);

  return (
    <TaskProvider
      task={data.success ? (data.data ? data.data : undefined) : undefined}
    >
      <NewTaskProvider
        task={data.success ? (data.data ? data.data : undefined) : undefined}
      >
        <div className="w-[1200px] mx-auto mt-6">{children}</div>
      </NewTaskProvider>
    </TaskProvider>
  );
}
