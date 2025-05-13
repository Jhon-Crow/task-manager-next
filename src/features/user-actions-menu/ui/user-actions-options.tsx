'use client'

import {useCallback} from "react";

export function UserActionsOptions({
                                       className,
                                       setIsOptionsOpened
                                   }: {
    className?: string;
    setIsOptionsOpened: (value: boolean) => void;
}) {
    const mouseLeaveHandler = useCallback(() => setIsOptionsOpened(false),[setIsOptionsOpened]);

    return (
        <div
            onMouseLeave={mouseLeaveHandler}
            className={className}
        >
            OPTS
        </div>
    );
}