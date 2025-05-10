import {User} from "@/shared/lib/db/generated";
import {redirect} from "next/navigation";
import {getUserById, UserPageCard} from "@/entities/user";
export default async function UserPage({
  params,
}: {
  params: Promise<{ id: User["id"] }>;
}) {
  const id = (await params).id;
  const user = await getUserById(id);
  if (!user || !user.success || !user.data) {
    redirect("./not-found");
  }

  return <UserPageCard user={user.data} />;
}
