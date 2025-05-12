import {ReactNode} from "react";
import {Button} from "@/shared/ui";


interface UserActionsMenuProps {
    children: ReactNode;

}

export function UserActionsMenu({children}: UserActionsMenuProps){
    return (
        <div className='relative'>
            <Button
                variant='ghost'
                className='absolute top-0 right-2
                  text-gray-700
                  z-99
                  p-2
                  m-0
                  h-4
                  '
            >...</Button>
            {children}
        </div>

    );
};