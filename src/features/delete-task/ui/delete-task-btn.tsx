import { Button } from "@/shared/ui";
import { ComponentProps } from "react";

export const DeleteTaskBtn = (
  props: Omit<ComponentProps<"button">, "children">
) => {
  return (
    <Button variant={"destructive"} {...props}>
      Удалить
    </Button>
  );
};
