'use client'

import {useState} from "react";
import {useRouter} from "next/navigation";
import {Button, Card} from "@/shared/ui";
import {UserDeleteDialogue} from "./user-delete-dialogue";

export function UserActionsOptions({
                                       className,
                                       setIsOptionsOpened,
                                       userId
                                   }: {
    className?: string;
    setIsOptionsOpened: (value: boolean) => void;
    userId: string;
}) {
    const router = useRouter();

    const mouseLeaveHandler = () => setIsOptionsOpened(false);
    const updateHandler = () => router.push( 'users/' + userId + '/update');

    return (
        <Card
            onMouseLeave={mouseLeaveHandler}
            className={className}
        >
            <Button
                className='rounded-xl w-full'
                onClick={updateHandler}
                variant='secondary'
            >Edit</Button>
            <UserDeleteDialogue userId={userId}/>
        </Card>
    );
}