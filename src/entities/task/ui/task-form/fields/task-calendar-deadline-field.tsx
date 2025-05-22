import { useActions } from "../../../model/slices/taskSlice";
import { TypeTaskForm } from "@/entities/task/public-types";
import { TypeField } from "@/shared/types";
import {
  Calendar,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui";

export const TaskCalendarDeadlineField: TypeField<TypeTaskForm, "deadline"> = ({
  ...props
}) => {
  const currentDay = new Date();
  currentDay.setDate(currentDay.getDate() - 1);
  const { setNewTaskDeadline } = useActions();
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="block space-y-2">
          <FormLabel className="text-center w-full block h-fit">
            Выбрать дедлайн
          </FormLabel>
          <Calendar
            mode="single"
            fromMonth={currentDay}
            selected={field.value}
            onSelect={(day) => {
              if (!day) return;
              setNewTaskDeadline(day);
              field.onChange(day);
            }}
            lang="ru-RU"
            disabled={(date) => date <= currentDay}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
