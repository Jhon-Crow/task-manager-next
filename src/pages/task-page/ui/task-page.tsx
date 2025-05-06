import { getTaskById, TaskPageCard } from "@/entities/task";
import { Task } from "@/shared/lib/db/generated";
import { redirect } from "next/navigation";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: Task["id"] }>;
}) {
  const id = (await params).id;
  const data = await getTaskById(id);
  if (!data.success) {
    //TODO
    return <div>Popa</div>;
  }
  if (!data.data) {
    redirect("./not-found");
  }
  return <TaskPageCard task={data.data} />;
}
