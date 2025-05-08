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
import {TypeUserForm} from "@/entities/user/model/types/user";

export const UserTextField: TypeField<TypeUserForm> = ({
    title,
    name,
    control,
  ...props
}) => {
  return (
      <FormField
          {...props}
          control={control}
          name={name}
          render={({ field }) => (
              <FormItem>
                  <FormLabel>{title}</FormLabel>
                  <div className="flex gap-4">
                      <FormItem className="flex items-center space-x-2">
                          <FormControl>
                              <Input
                                  type="text"
                                  onChange={(e) => field.onChange(e.target.value)}
                              />
                          </FormControl>
                      </FormItem>
                  </div>
                  <FormMessage />
              </FormItem>
          )}
      />
  );
};
