"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TasksFilters, TasksResponse } from "../model/types/api";
import { TypeTask } from "../public-types";

const tasksApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  endpoints: (builder) => ({
    getInfinityTask: builder.query<
      TasksResponse,
      { cursor?: TypeTask["id"]; pageSize?: number; filters: TasksFilters }
    >({
      query: ({ cursor, pageSize = 10, filters = {} }) => {
        const params = new URLSearchParams();

        if (cursor) params.append("cursor", cursor);

        params.append("pageSize", pageSize.toString());

        if (filters.title) params.append("title", filters.title);
        if (filters.completed !== undefined)
          params.append("completed", String(filters.completed));

        return `tasks?${params.toString()}`;
      },
      transformResponse: (response: TasksResponse, meta, arg) => ({
        ...response,
        requestParams: arg,
      }),
    }),
  }),
});

export const {
  useGetInfinityTaskQuery,
  middleware: tasksMiddleware,
  reducer: tasksReducer,
  reducerPath: tasksReducerName,
} = tasksApi;
