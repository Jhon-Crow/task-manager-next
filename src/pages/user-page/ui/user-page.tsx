import { User } from "@/shared/lib/db/generated";
import { redirect } from "next/navigation";
import { getUserById, UserPageCard, UserProvider } from "@/entities/user";
import {Routes} from "@/shared/consts/paths";
export default async function UserPage({
  params,
}: {
  params: Promise<{ id: User["id"] }>;
}) {
  const id = (await params).id;
  const user = await getUserById(id);
  if (!user.success || !user.data) {
    redirect("/not-found");
  }

  return (
    <UserProvider user={user.data}>
      <UserPageCard user={user.data} />
    </UserProvider>
  );
}
