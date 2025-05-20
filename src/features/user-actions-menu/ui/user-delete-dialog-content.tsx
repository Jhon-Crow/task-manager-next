import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui";
import React from "react";

type Props = {
  deleteHandler: () => void;
};

export const UserDeleteDialogContent = ({ deleteHandler }: Props) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-red-400">Delete user?</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete the user?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button variant="destructive" type="submit" onClick={deleteHandler}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
