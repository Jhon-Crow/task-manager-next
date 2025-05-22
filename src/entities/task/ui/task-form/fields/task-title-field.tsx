import { useActions } from "../../../model/slices/taskSlice";
import { TypeTaskForm } from "@/entities/task/model/types/task";
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
  const { setNewTaskTitle } = useActions();

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
                setNewTaskTitle(e.target.value);
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
