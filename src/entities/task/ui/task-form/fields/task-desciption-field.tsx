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
import { cn } from "@/shared/lib/utils";

export const TaskDescriptionField: TypeField<TypeTaskForm, "description"> = ({
  className,
  ...props
}) => {
  const { setNewTask } = useNewTaskContext();
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem
          className={cn("flex flex-col gap-y-3 max-h-2/3 relative", className)}
        >
          <FormLabel className="block p-0 focus:relative">Описание</FormLabel>
          <FormControl>
            <Textarea
              className=" h-full focus:min-w-[450px] resize-none min-w-12 focus:!bg-card focus:absolute z-2"
              placeholder="Опишите задачу..."
              {...field}
              onChange={(e) => {
                setNewTask({ description: e.target.value });
                field.onChange(e.target.value);
              }}
            />
          </FormControl>
          <FormDescription className="mt-auto">Необязательно</FormDescription>
        </FormItem>
      )}
    />
  );
};
