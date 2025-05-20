import { getTaskById, TaskPageCard } from "@/entities/task";
import { getUserById, getUsersAssignedToTask } from "@/entities/user";
import { Routes } from "@/shared/consts/paths";
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
    return <div>Не успешно</div>;
  }
  console.log(id);

  if (!data.data) {
    redirect(Routes.TASK(id) + "/not-found");
  }
  const users = await getUsersAssignedToTask(id);
  const author = await getUserById(data.data.authorId);
  return (
    <TaskPageCard
      task={data.data}
      author={
        author.success ? (author.data ? author.data : undefined) : undefined
      }
      users={users.success ? users.data : undefined}
    />
  );
}
