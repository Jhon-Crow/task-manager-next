import { TypeField } from "@/shared/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";
import { TypeUserCreateForm } from "@/entities/user/model/types/user";

export const UserEmailField: TypeField<TypeUserCreateForm, "email"> = ({
  ...props
}) => {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Почтовый адрес:</FormLabel>
          <FormControl>
            <Input
              placeholder="Введите почтовый адрес..."
              type="email"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
