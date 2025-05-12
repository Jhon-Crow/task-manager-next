'use client'
import {Button, Card} from "@/shared/ui";
import {useRouter} from "next/navigation";
import {useCallback} from "react";

export default function NotFoundUniversal() {
    const router = useRouter();
    const goBackHandler = useCallback(() => router.back(),[]);
    return (
        <Card className='pl-4 block w-full'>
            <h2>Not Found</h2>
            <p>Page not exist</p>
            <Button
                onClick={goBackHandler}
            >Go Back</Button>
        </Card>
    )
}