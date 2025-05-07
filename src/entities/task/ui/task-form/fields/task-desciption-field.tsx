import { TypeField } from "@/shared/types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Textarea,
} from "@/shared/ui";
import { TypeTaskForm } from "../../../model/types/task";
import { useNewTaskContext } from "@/shared/hooks/useNewTaskContext";

export const TaskDescriptionField: TypeField<TypeTaskForm, "description"> = ({
  ...props
}) => {
  const { setNewTask } = useNewTaskContext();
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Описание</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Опишите задачу..."
              {...field}
              onChange={(e) => {
                setNewTask({ description: e.target.value });
                field.onChange(e.target.value);
              }}
            />
          </FormControl>
          <FormDescription>Необязательно</FormDescription>
        </FormItem>
      )}
    />
  );
};
