import {UserListWidget} from "@/widgets/user-list-widget";
import {getAllUsers} from "@/entities/user/model/service/getAllUsers/getAllUsers";

export default async function UsersListPage() {
  const users = await getAllUsers();
  if (!(users instanceof Object)) {
    return <div>{users}</div>;
  }
  return <UserListWidget users={users}/>;
}
