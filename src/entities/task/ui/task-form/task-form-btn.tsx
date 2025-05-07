import { Button } from "@/shared/ui";
import { useFormState } from "react-hook-form";

export const TaskFormBtn = ({
  isCreate = true,
  className,
}: {
  isCreate: boolean;
  className?: string;
}) => {
  const { isSubmitting, isSubmitted } = useFormState();

  return (
    <Button
      disabled={isSubmitting || isSubmitted}
      type="submit"
      className={className}
    >
      {isCreate ? "Создать" : "Обновить"}
    </Button>
  );
};
