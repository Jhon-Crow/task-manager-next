import { TypeField } from "@/shared/types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
} from "@/shared/ui";
import { role } from "../../../model/consts/consts";
// import { TypeDifficultTask, TypeTaskForm } from "../../../model/types/task";
// import { TaskDifficultyIcon } from "../../tasks-icons/difficulty-icon";
import { useNewTaskContext } from "@/shared/hooks/useNewTaskContext";
import {UserRoleIcon} from "@/entities/user/ui/users-icons/role-icon";
import {TypeRoleUser, TypeUserForm} from "@/entities/user/model/types/user";

export const UserRoleField: TypeField<TypeUserForm, "role"> = ({
  ...props
}) => {
  const { setNewTask } = useNewTaskContext();
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="space-y-4">
          <div className="space-y-2">
            <FormLabel>Роль</FormLabel>
            <FormDescription>Обязательно</FormDescription>
          </div>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                setNewTask({
                  role: value as NonNullable<TypeRoleUser>,
                });
              }}
              defaultValue={field.value}
              className="flex flex-col gap-y-8 ml-2"
            >
              {Object.entries(role).map(([value, label]) => (
                <FormItem key={value} className="flex items-center">
                  <FormLabel className="font-normal">
                    <UserRoleIcon
                      role={value as TypeRoleUser}
                      className="p-0 mr-2"
                    />
                    <FormControl>
                      <RadioGroupItem value={value} />
                    </FormControl>
                    {label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
