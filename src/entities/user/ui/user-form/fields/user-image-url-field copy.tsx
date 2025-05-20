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

export const UserImageUrlField: TypeField<TypeUserCreateForm, "imageUrl"> = ({
  ...props
}) => {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>Введите адрес изображения:</FormLabel>
          <FormControl>
            <Input placeholder="Введите адрес изображения..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
