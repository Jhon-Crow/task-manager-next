import { Button } from "@/shared/ui";
import { useEffect, useRef } from "react";
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
  useEffect(() => {
    setTimeout(() => {
      ref.current?.click();
    }, 10000);
  });
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
