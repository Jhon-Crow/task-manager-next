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
import { priority } from "../../../model/consts/consts";
import { TypePriorityTask, TypeTaskForm } from "../../../model/types/task";
import { TaskPriorityIcon } from "../../tasks-icons/priority-icon";

export const TaskPriorityField: TypeField<TypeTaskForm, "priority"> = ({
  ...props
}) => {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="space-y-4">
          <div className="space-y-2">
            <FormLabel>Приоритет</FormLabel>
            <FormDescription>Необязательно</FormDescription>
          </div>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col gap-y-8 ml-2"
            >
              {Object.entries(priority).map(([value, label]) => (
                <FormItem key={value} className="flex items-center">
                  <FormLabel className="font-normal">
                    <TaskPriorityIcon
                      priority={value as TypePriorityTask}
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
