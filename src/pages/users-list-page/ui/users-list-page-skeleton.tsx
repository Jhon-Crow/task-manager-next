import {Card, CardContent, CardHeader, CardTitle, Skeleton,} from "@/shared/ui";
import {Ellipsis} from "lucide-react";

export function UsersListPageSkeleton() {
    const emptArr = new Array(9).fill(0);

    return (
        <Card>
            <CardHeader>
                <CardTitle> Загрузка...</CardTitle>
            </CardHeader>
            {
                emptArr.map((i) => <CardContent key={i}>
                    <Card className="relative group flex-row justify-between items-center hover:scale-101 transition-transform shadow-lg delay-100 duration-200 ease-in pr-10">
                        <CardHeader className="w-[400px] relative flex items-center">
                            <Skeleton className='h-8 w-8 rounded-full'/>
                            <div className="ml-1 flex-row">
                                <Skeleton className='h-4 w-20 mb-2'/>
                                <Skeleton className='h-2 w-30'/>
                            </div>
                        </CardHeader>
                        <Ellipsis size={16}/>
                    </Card>
                </CardContent>)
            }
        </Card>
    );
}
