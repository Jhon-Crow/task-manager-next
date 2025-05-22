import {Card, CardContent, CardHeader, CardTitle, Skeleton,} from "@/shared/ui";

export function UserLoader() {
    const emptArr = new Array(9).fill(0);


    return (
        <Card>
            <CardHeader>
                <CardTitle> Загрузка...</CardTitle>
            </CardHeader>
            {
                emptArr.map(() => <CardContent>
                    <Card className="relative group flex-row justify-between items-center hover:scale-101 transition-transform shadow-lg delay-100 duration-200 ease-in">
                        <CardHeader className="w-[400px] relative flex items-center">
                            <Skeleton className='h-8 w-8 rounded-full'/>
                            <div className="ml-1 flex-row">
                                <Skeleton className='h-4 w-20 mb-2'/>
                                <Skeleton className='h-2 w-30'/>
                            </div>
                        </CardHeader>
                    </Card>
                </CardContent>)
            }
        </Card>
    );
}
