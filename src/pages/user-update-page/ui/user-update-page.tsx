import {UserFormWidget} from "@/widgets/user-form-widget";
import {User} from "@/shared/lib/db/generated";
import {getUserById} from "@/entities/user";
import {redirect} from "next/navigation";

export default async function UserUpdatePage({
                                         params,
                                       }: {
  params: Promise<{ id: User["id"] }>;
}) {
  const id = (await params).id;
  const user = await getUserById(id);
  if (!user.success || !user.data) {
    redirect("./not-found");
  }


  return <UserFormWidget type="update" userId={id}/>;
}
