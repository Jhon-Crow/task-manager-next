import { Button } from "@/shared/ui";
import { useRef } from "react";
import { useFormState } from "react-hook-form";

export const TaskFormBtn = ({
  isCreate = true,
  className,
}: {
  isCreate: boolean;
  className?: string;
}) => {
  const { isSubmitting, isSubmitted, isValid } = useFormState();
  const ref = useRef<HTMLButtonElement | null>(null);
  return (
    <Button
      ref={ref}
      disabled={isSubmitting || (isSubmitted && !isValid)}
      type="submit"
      className={className}
    >
      {isCreate ? "Создать" : "Обновить"}
    </Button>
  );
};
