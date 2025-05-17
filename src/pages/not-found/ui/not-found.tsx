import Link from 'next/link'
import {Card} from "@/shared/ui";

export function NotFoundPage() {

    return (
        <Card className='pl-4'>
            <h2>Не найдено!</h2>
            <p>Запрошенный ресурс не обнаружен</p>
            <Link href="/">
                Вернуться на главную
            </Link>
        </Card>
    )
}