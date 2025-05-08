import { Button } from "@/shared/ui";
import { useFormState } from "react-hook-form";

export const UserFormBtn = ({
  isCreate = true,
  className,
}: {
  isCreate: boolean;
  className?: string;
}) => {
  const { isSubmitting, isSubmitted } = useFormState();

  console.log(isSubmitting)

  return (
    <Button
      disabled={isSubmitting}
      type="submit"
      className={className}
    >
      {isCreate ? "Создать" : "Обновить"}
    </Button>
  );
};
