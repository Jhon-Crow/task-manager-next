import { Button } from "@/shared/ui";
import { useFormState } from "react-hook-form";

export const TaskFormBtn = ({
  isCreate = true,
  className,
}: {
  isCreate: boolean;
  className?: string;
}) => {
  const { isSubmitting, isSubmitted, isValid } = useFormState();

  return (
    <Button
      disabled={isSubmitting || (isSubmitted && !isValid)}
      type="submit"
      className={className}
    >
      {isCreate ? "Создать" : "Обновить"}
    </Button>
  );
};
