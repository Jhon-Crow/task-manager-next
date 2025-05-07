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
import { difficulty } from "../../../model/consts/consts";
import { TypeDifficultTask, TypeTaskForm } from "../../../model/types/task";
import { TaskDifficultyIcon } from "../../tasks-icons/difficulty-icon";
import { useNewTaskContext } from "@/shared/hooks/useNewTaskContext";

export const TaskDifficlyField: TypeField<TypeTaskForm, "difficulty"> = ({
  ...props
}) => {
  const { setNewTask } = useNewTaskContext();
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="space-y-4">
          <div className="space-y-2">
            <FormLabel>Сложность</FormLabel>
            <FormDescription>Необязательно</FormDescription>
          </div>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                setNewTask({
                  difficulty: value as NonNullable<TypeDifficultTask>,
                });
              }}
              defaultValue={field.value}
              className="flex flex-col gap-y-8 ml-2"
            >
              {Object.entries(difficulty).map(([value, label]) => (
                <FormItem key={value} className="flex items-center">
                  <FormLabel className="font-normal">
                    <TaskDifficultyIcon
                      difficult={value as TypeDifficultTask}
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
