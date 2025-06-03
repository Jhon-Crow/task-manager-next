import {TypeReview, TypeTask} from "@/entities/task/model/types/task";
import {Card, CardContent, CardFooter, CardHeader} from "@/shared/ui";
import {getUserById} from "@/entities/user";
import {TypeUser} from "@/entities/user/model/types/user";

export async function ReviewMessagesList({
                                             reviews,
                                             task,
                                             sessionUser
}: {
    reviews: TypeReview[],
    task: TypeTask,
    sessionUser: TypeUser
}){
    // console.log(reviews)
    // console.log(sessionUser)
    console.log(task)
    return (
        <Card className='max-w-2xl flex-col'>
            {reviews.map(r => (
                <Card key={r}
                    className={'text-white ' + (sessionUser.id === r.userId ? 'ml-auto bg-red-600' : 'mr-auto bg-blue-700') }
                >
                    {/*{task.author.id === r.userId && <CardHeader></CardHeader>}*/}
{/*<h1>{task.author.id === r.userId ? 'authors review' : 'Not authors review'}</h1>*/}
                    <CardHeader>{task.workers.find(w => w.id === r.userId).firstname}</CardHeader>
                    <CardContent>{r.text}</CardContent>


                    <CardFooter>{r.createdAt + ''}</CardFooter>
                </Card>

            ))}
        </Card>
    );
};