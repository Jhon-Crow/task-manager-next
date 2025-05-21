import { TypeField } from "@/shared/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";
import { role } from "../../../model/consts/consts";
import {
  TypeUserCreateForm,
  TypeUserUpdateForm,
} from "@/entities/user/model/types/user";

export const UserRoleField: TypeField<
  TypeUserCreateForm | TypeUserUpdateForm,
  "role"
> = ({ control, defaultValue, ...props }) => {
  return (
    <FormField
      {...props}
      control={control}
      name="role"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Роль</FormLabel>
          <div className="flex gap-4">
            {Object.keys(role).map((r) => (
              <FormItem key={r} className="flex items-center space-x-2">
                <FormControl>
                  <Input
                    defaultValue={defaultValue}
                    type="radio"
                    checked={field.value === r}
                    onChange={() => field.onChange(r)}
                  />
                </FormControl>
                <FormLabel className="font-normal">{r}</FormLabel>
              </FormItem>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
