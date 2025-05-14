import { Button } from "@/shared/ui";
import { ComponentProps, memo } from "react";

export const DeleteBtn = memo(function DeleteBtn(
  props: Omit<ComponentProps<"button">, "children">
) {
  return (
    <Button variant={"destructive"} {...props}>
      Удалить
    </Button>
  );
});
