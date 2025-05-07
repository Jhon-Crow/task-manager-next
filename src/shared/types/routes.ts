import { ReactNode } from "react";

type RootStaticPaths = readonly ["home"];

type TaskStaticPaths = readonly ["tasks", "tasks/create"];
type TaskDynamicPaths = readonly ["tasks/[id]", "tasks/[id]/update"];

export type TypeStaticPaths = [...TaskStaticPaths, ...RootStaticPaths];
export type TypeDynamicPaths = [...TaskDynamicPaths];

export type TypeNameOfRoute =
  | Capitalize<string>
  | Exclude<ReactNode, string | number | bigint | boolean | null | undefined>;

export type TypeStaticPathObject = {
  key: Uppercase<string>;
  path: `/${
    | Exclude<TypeStaticPaths[number], "home">
    | TaskDynamicPaths[number]
    | ""}`;
  name: TypeNameOfRoute;
  type: "static";
};

export type TypeDynamicPathObject = {
  key: Uppercase<string>;
  path: (...args: string[]) => `/${string}`;
  type: "dynamic";
  actionName: TypeNameOfRoute | null;
};
