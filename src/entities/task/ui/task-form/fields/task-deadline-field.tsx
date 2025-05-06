import { TypeField } from "@/shared/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";
import { TypeTaskForm } from "../../../model/types/task";

export const TaskDeadlineField: TypeField<TypeTaskForm, "deadline"> = ({
  ...props
}) => {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Время на выполнение</FormLabel>
          <FormControl>
            <Input
              placeholder="Количество дней от текущей даты"
              {...field}
              type="number"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
