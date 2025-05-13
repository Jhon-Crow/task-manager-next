'use client'
import {ReactNode, useCallback, useState} from "react";
import {Button} from "@/shared/ui";
import {deleteUserById} from "@/entities/user/model/service/deleteUserById/deleteUserById";
import {UserActionsOptions} from "@/features/user-actions-menu/ui/user-actions-options";


interface UserActionsMenuProps {
    children: ReactNode;
    userId: string;
}

export function UserActionsMenu({children, userId}: UserActionsMenuProps){
    const [isOptionsOpened, setIsOptionsOpened] = useState(false);

    const onClickHandler = useCallback(() => {
        setIsOptionsOpened(!isOptionsOpened);
    },[isOptionsOpened])

    return (
        <div className='relative'>
            {!isOptionsOpened
                ? <Button
                onClick={onClickHandler}
                variant='ghost'
                className='absolute top-1 right-3
                  text-gray-700
                  z-2
                  p-1
                  pb-3
                  h-1
                  flex items-center justify-center
                  text-center
                  '
            >...</Button>
            : <UserActionsOptions
                    userId={userId}
                    setIsOptionsOpened={setIsOptionsOpened}
                    className='absolute top-1 right-0
                  z-2
                  text-gray-700
                  p-0
                  gap-0
                  h-auto
                  flex items-center justify-center
                  text-center
                  '
                />
            }
            {children}
        </div>
    );
};