import Link from 'next/link'
import {Card} from "@/shared/ui";

export default function NotFound() {
    return (
        <Card className='pl-4'>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
        </Card>
    )
}