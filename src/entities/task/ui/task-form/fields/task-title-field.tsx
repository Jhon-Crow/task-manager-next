import { TypeTaskForm } from "@/entities/task/model/types/task";
import { useNewTaskContext } from "@/shared/hooks/useNewTaskContext";
import { TypeField } from "@/shared/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";

export const TaskTitleField: TypeField<TypeTaskForm, "title"> = ({
  ...props
}) => {
  const { setNewTask } = useNewTaskContext();
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Задача:</FormLabel>
          <FormControl>
            <Input
              placeholder="Название..."
              {...field}
              onChange={(e) => {
                setNewTask({ title: e.target.value });
                field.onChange(e);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
