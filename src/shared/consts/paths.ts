import { createElement } from "react";
import type {
  TypeDynamicPaths,
  TypeDynamicPathObject,
  TypeStaticPathObject,
  TypeStaticPaths,
} from "../types";
import { Home } from "lucide-react";

export const staticPaths = {
  tasks: {
    key: "TASKS_LIST",
    path: "/tasks",
    type: "static",
    name: "Задачи",
  } as const,
  "tasks/create": {
    key: "TASK_CREATE",
    path: "/tasks/create",
    type: "static",
    name: "Создать Задачу",
  } as const,
  home: {
    key: "ROOT",
    path: "/",
    type: "static",
    name: createElement(Home, { className: "size-5" }),
  } as const,
} as const satisfies Record<TypeStaticPaths[number], TypeStaticPathObject>;

export const dynamicPaths = {
  "tasks/[id]": {
    key: "TASK",
    path: (id: string) => `/tasks/${id}`,
    type: "dynamic",
    actionName: null,
  } as const,
  "tasks/[id]/update": {
    key: "TASK_UPDATE",
    path: (id: string) => `/tasks/${id}/update`,
    type: "dynamic",
    actionName: "Обновить",
  } as const,
} as const satisfies Record<TypeDynamicPaths[number], TypeDynamicPathObject>;

type TransformedPathsType<
  T extends Record<
    string,
    {
      readonly key: string;
      readonly path: string | ((...args: string[]) => string);
    }
  >
> = {
  [K in keyof T as T[K]["key"]]: T[K]["path"];
};

export const Routes = Object.values(
  Object.assign({}, staticPaths, dynamicPaths)
).reduce(
  (acc, { key, path }) => ({ ...acc, [key]: path }),
  {} as TransformedPathsType<typeof staticPaths & typeof dynamicPaths>
);
