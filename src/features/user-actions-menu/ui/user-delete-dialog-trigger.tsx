import { DialogTrigger } from "@/shared/ui/Dialog/dialog";
import { Button } from "@/shared/ui";

export const UserDeleteDialogTrigger = () => {
  return (
    <DialogTrigger asChild>
      <Button className="rounded-xl w-full" variant="destructive">
        Удалить
      </Button>
    </DialogTrigger>
  );
};
