import {TypeReview, TypeTask} from "@/entities/task/model/types/task";
import {Card, CardContent, CardFooter, CardHeader} from "@/shared/ui";
import {TypeUser} from "@/entities/user/model/types/user";
import {generateColors} from "@/entities/review/function/generateColors";
import {formatDateToRuShort} from "@/shared/lib/format/formatDayToRuShort";

export async function ReviewMessagesList({
                                             reviews,
                                             task,
                                             sessionUser
}: {
    reviews: TypeReview[],
    task: TypeTask,
    sessionUser: TypeUser
}){
    console.log('task', task)
    console.log('reviews', reviews)
    return (
        <Card className='max-w-165 flex-col'>
            {reviews.map(r => {
                const user = task!.workers.find(w => w.id === r.userId)
                    || (r.userId === task.author.id) && task.author;
                const {firstname, lastname, role} = user;
                const color = generateColors(firstname, role, lastname);
                    console.log(color)
                return (
                    <Card key={r}
                          className={sessionUser.id === r.userId ? 'ml-auto' : 'mr-auto'}
                          style={color}
                    >
                        <CardHeader>{firstname + ' ' + (lastname ? lastname : '') }</CardHeader>
                        {/*todo add аватарки */}
                        <CardContent>{r.text}</CardContent>


                        <CardFooter>{formatDateToRuShort(r.createdAt)}</CardFooter>
                        {/*    todo сделать нормальный формат даты*/}
                    </Card>
                )
            }
            )}
        </Card>
    );
};