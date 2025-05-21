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

export const UserLastnameField: TypeField<
  TypeUserCreateForm | TypeUserUpdateForm,
  "lastname"
> = ({ ...props }) => {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Фамилия:</FormLabel>
          <FormControl>
            <Input placeholder="Введите фамилию..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
