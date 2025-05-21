import { TypeField } from "@/shared/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";
import {
  TypeUserCreateForm,
  TypeUserUpdateForm,
} from "@/entities/user/model/types/user";

export const UserFirstnameField: TypeField<
  TypeUserCreateForm | TypeUserUpdateForm,
  "firstname"
> = ({ ...props }) => {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Имя:</FormLabel>
          <FormControl>
            <Input placeholder="Введите имя..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
