'use server'
import {UserForm} from "@/entities/user/ui/user-form/user-form";
import {getUserById} from "@/entities/user";
import {User} from "@/shared/lib/db/generated";
import {TypeUserForm} from "@/entities/user/model/types/user";
import {updateUser} from "@/entities/user/model/service/updateUser/updateUser";

export const UpdateUserForm = async ({userId}: {userId: User['id']}) => {
  // const user = useSelectUser(); //todo добавить селектор
  // const { setUser } = useUserActions();

    const defaultValues = await getUserById(userId);
    console.log(userId, defaultValues)


  //
  // const defaultValues = useMemo(
  //     () => ({
  //       deadline: new Date(task?.deadline || new Date()),
  //       title: task?.title || "",
  //       description: task?.description || "",
  //       difficulty: task?.difficulty || undefined,
  //       priority: task?.priority || undefined,
  //     }),
  //     [
  //       task?.deadline,
  //       task?.description,
  //       task?.difficulty,
  //       task?.priority,
  //       task?.title,
  //     ]
  // );
  // useEffect(() => {
  //   setNewTask({
  //     ...defaultValues,
  //     deadline: defaultValues.deadline.getTime(),
  //   });
  // }, [defaultValues, setNewTask]);

    //
    // const defaultValues = 'lul'
  return (
      <UserForm
          defaultValues={defaultValues.data}
          // id={userId}
          // submit={(values: TypeUserForm) => updateUser(userId, values)}
          submit={updateUser}
      />
  );
}
