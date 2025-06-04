import {TypeReview, TypeTask} from "@/entities/task/model/types/task";
import {Card, CardContent, CardFooter, CardHeader} from "@/shared/ui";
import {TypeUser} from "@/entities/user/model/types/user";
import {generateColors} from "@/entities/review/function/generateColors";
import {formatDateToRuShort} from "@/shared/lib/format/formatDayToRuShort";
import {UserAvatar} from "@/entities/user";

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
                const {firstname, lastname, role, imageUrl} = user;
                const color = generateColors(firstname, role, lastname);
                const thisUser = sessionUser.id === r.userId;
                return (
                    <Card key={r}
                          className={thisUser ? 'ml-auto' : 'mr-auto'}
                          style={color}
                    >
                        <CardHeader className={'flex min-w-40 justify-' + (thisUser ? 'end' : 'start') + ' items-center'}>
                            {imageUrl ? <UserAvatar user={user}/> : null}
                            {firstname + ' ' + (lastname ? lastname : '') }
                        </CardHeader>
                        <CardContent>{r.text}</CardContent>
                        <CardFooter>{formatDateToRuShort(r.createdAt) + ' ' + r.createdAt.getHours() + ':' + (r.createdAt.getMinutes() ? r.createdAt.getMinutes() : '00')}</CardFooter>
                    </Card>
                )
            }
            )}
        </Card>
    );
};