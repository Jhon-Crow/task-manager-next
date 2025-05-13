import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shared/ui/Dialog/dialog";
import {Button} from "@/shared/ui";
import {deleteUserById} from "@/entities/user/model/service/deleteUserById/deleteUserById";
import {TypeUser} from "@/entities/user/model/types/user";

export const UserDeleteDialogue = ({userId}: {userId: TypeUser['id']}) => {

    const deleteHandler = () => deleteUserById(userId);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='rounded-xl w-full' variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className='text-red-400'>Delete user?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the user?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter >
                    <DialogClose>
                        <Button variant='outline'>Cancel</Button>
                    </DialogClose>
                    <Button variant='destructive' type="submit"
                        onClick={deleteHandler}
                    >Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};