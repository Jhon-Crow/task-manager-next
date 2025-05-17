import { getTaskById, TaskPageCard } from "@/entities/task";
import { getUserById, getUsersAssignedToTask } from "@/entities/user";
import { Task } from "@/shared/lib/db/generated";
import { redirect } from "next/navigation";
import {Routes} from "@/shared/consts/paths";

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
  if (!data.data) {
    redirect('/not-found');
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
