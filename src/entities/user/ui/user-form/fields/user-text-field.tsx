import { TypeField } from "@/shared/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";
import { TypeUserForm } from "@/entities/user/model/types/user";

export const UserTextField: TypeField<
  TypeUserForm,
  "firstname" | "lastname" | "email" | "imageUrl"
> = ({
  title,
  name,
  control,
  // defaultValue,
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
                  {...field}
                  // defaultValue={defaultValue}
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
