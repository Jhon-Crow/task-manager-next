"use client";
import {UserForm} from "@/entities/user/ui/user-form/user-form";
import {getUserById} from "@/entities/user";
import {useParams} from "next/navigation";

export const UpdateUserForm = () => {
  // const user = useSelectUser(); //todo добавить селектор
  // const { setUser } = useUserActions();

    const params = useParams();
    const id = params?.id as string;
    const defaultValues = getUserById(id);



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
          defaultValues={defaultValues}
          // id={id}
          // submit={(values: TypeTaskForm) => updateTask(task?.id, values)}
      />
  );
}
