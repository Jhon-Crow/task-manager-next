import Link from 'next/link'
import {Card} from "@/shared/ui";

export default function Page() {
    return (
        <Card className='pl-4'>
            <h2>Not Found</h2>
            <p>Could not find requested task</p>
            <Link href="/tasks">Return To Tasks</Link>
        </Card>
    )
}