import {getAllTasks, getAllTasksRoute, tasksListReducer, tasksReducer} from "@/entities/task";
import { DynamicModuleLoader } from "@/shared/lib/components";
import { TaskListDataTableWidget } from "@/widgets/task-list-data-table-widget";
import {TaskListWidget} from "@/widgets/task-list-widget";
import {SearchParams} from "next/dist/server/request/search-params";
import {SearchParamsSchema} from "@/entities/task/model/validation/searchParamsSchema";
import {makeReqForRoute} from "@/entities/task/utils/makeReqForRoute";
import {Card, CardContent, CardFooter, CardHeader} from "@/shared/ui";
import {TypeTask} from "@/entities/task/model/types/task";
import Link from "next/link";

const reducers: ReducersList = {
  taskApi: tasksReducer,
  tasksListSlice: tasksListReducer,
};

export default async function TasksListPage({searchParams}: SearchParams) {
    // console.log(makeReqForRoute(await searchParams))
    const safeParse=SearchParamsSchema.parse(await searchParams);
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
              <CardContent>{task.workers?.map((w, i)=><div key={i}>{w.firstname}</div>)}</CardContent>
              <CardFooter>{task.createdAt}</CardFooter>
          </Card>)
      }
      <div className={'flex gap-4'}><div>{response.currentPage>1 ? <Link href={`?${prevPageParams.toString()}`}>{response.currentPage-1}</Link> : null}</div>
      <div >{response.currentPage<response.totalPages ? <Link href={`?${nextPageParams.toString()}`}>{response.currentPage+1}</Link> : null}</div></div>
      </div>

  );
}
