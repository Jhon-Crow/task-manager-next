import {searchParamsType} from "@/entities/task/model/validation/searchParamsSchema";

export const makeReqForRoute = ({page=1, sorting='createdAt', query=''}:searchParamsType) => {
    const baseUrl = 'http://localhost:3000/api/v1/tasks?'
   const params = new URLSearchParams();
    params.append("page", page.toString());
    if (query) params.append("query", query.toString());
    if (sorting) params.append("sorting", sorting.toString());
    // if (filters.completed !== undefined)
    //     params.append("completed", String(filters.completed));
    // console.log(`${baseUrl}${params.toString()}`)
    return `${baseUrl}${params.toString()}`
}