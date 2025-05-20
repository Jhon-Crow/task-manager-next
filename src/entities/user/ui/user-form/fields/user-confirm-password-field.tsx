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

export const UserConfirmPasswordField: TypeField<
  TypeUserCreateForm,
  "confirmPassword"
> = ({ ...props }) => {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel htmlFor="confirmPassword">Подтвердите пароль:</FormLabel>
          <FormControl>
            <Input
              placeholder="Повторите пароль..."
              id="confirmPassword"
              type="password"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
