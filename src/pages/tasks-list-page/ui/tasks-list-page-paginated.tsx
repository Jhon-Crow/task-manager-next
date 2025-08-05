import {makeReqForRoute, searchParamsSchema, tasksListReducer, tasksReducer, TypeTask} from "@/entities/task";
import {Card, CardContent, CardFooter, CardHeader} from "@/shared/ui";
import Link from "next/link";

const reducers: ReducersList = {
  taskApi: tasksReducer,
  tasksListSlice: tasksListReducer,
};

export default async function TasksListPagePaginated({searchParams}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const safeParse=searchParamsSchema.parse(await searchParams);
    const response = await fetch(makeReqForRoute(safeParse)).then(res => res.json());
    const prevPageParams = new URLSearchParams({
        ...safeParse,
        page: (response.currentPage - 1).toString()
    });

    const nextPageParams = new URLSearchParams({
        ...safeParse,
        page: (response.currentPage + 1).toString()
    });
  return (
      <div>{
          response.tasks.map((task: TypeTask, index: number)=> <Card  key={index}>
              <CardHeader>{ task.title }</CardHeader>
              <CardContent>{task.workers?.map((worker, index)=><div key={index}>{worker.firstname}</div>)}</CardContent>
              <CardFooter>{task.createdAt}</CardFooter>
          </Card>)
      }
      <div className={'flex gap-4'}><div>{response.currentPage>1 ? <Link href={`?${prevPageParams.toString()}`}>{response.currentPage-1}</Link> : null}</div>
      <div >{response.currentPage<response.totalPages ? <Link href={`?${nextPageParams.toString()}`}>{response.currentPage+1}</Link> : null}</div></div>
      </div>
  );
}
