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

export const UserPasswordField: TypeField<TypeUserCreateForm, "password"> = ({
  ...props
}) => {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Пароль:</FormLabel>
          <FormControl>
            <Input placeholder="Введите пароль..." type="password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
