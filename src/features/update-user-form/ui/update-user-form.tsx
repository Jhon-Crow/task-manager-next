import {UserForm} from "@/entities/user/ui/user-form/user-form";
import {updateUser} from "@/entities/user/model/service/updateUser/updateUser";
import {TaskForm, useSelectTask, useTaskActions} from "@/entities/task";
import {useEffect, useMemo} from "react";
import {TypeTaskForm} from "@/entities/task/model/types/task";
import {updateTask} from "@/entities/task/model/service/updateTask/updateTask";
import {useUserActions} from "@/entities/user";

export const UpdateUserForm = () => {
  const user = useSelectUser(); //todo добавить селектор
  const { setUser } = useUserActions();

  const defaultValues = useMemo(
      () => ({
        deadline: new Date(task?.deadline || new Date()),
        title: task?.title || "",
        description: task?.description || "",
        difficulty: task?.difficulty || undefined,
        priority: task?.priority || undefined,
      }),
      [
        task?.deadline,
        task?.description,
        task?.difficulty,
        task?.priority,
        task?.title,
      ]
  );
  useEffect(() => {
    setNewTask({
      ...defaultValues,
      deadline: defaultValues.deadline.getTime(),
    });
  }, [defaultValues, setNewTask]);
  return (
      <TaskForm
          defaultValues={defaultValues}
          id={task?.id}
          submit={(values: TypeTaskForm) => updateTask(task?.id, values)}
      />
  );
}
