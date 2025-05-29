import { getTaskById, TaskProvider } from "@/entities/task";
import { TypeTask } from "@/entities/task/public-types";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function TaskPageLayout({
  children,
  params,
}: {
  params: Promise<{ id?: string }>;
  children: Readonly<ReactNode>;
}) {
  const id = (await params).id;
  let task: TypeTask | null = null;
  if (id) {
    const data = await getTaskById(id);
    if (!data.success) {
      redirect("/not-found");
    }
    task = data.data;
  }

  return (
    <div className="w-[1200px] mx-auto mt-6 flex flex-col items-center">
      <TaskProvider task={task}>{children}</TaskProvider>
    </div>
  );
}
