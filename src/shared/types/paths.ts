import { ReactNode } from "react";

type RootStaticPaths = readonly ["home"];

type TaskStaticPaths = readonly ["tasks", "tasks/create", "tasks/[id]/update"];
type TaskDynamicPaths = readonly ["tasks/[id]"];

type UserStaticPaths = readonly ["users"];
type UserDynamicPaths = readonly ["users/[id]"];

export type TypeStaticPaths = [
  ...TaskStaticPaths,
  ...RootStaticPaths,
  ...UserStaticPaths
];
export type TypeDynamicPaths = [...TaskDynamicPaths, ...UserDynamicPaths];

export type TypeNameOfRoute =
  | Capitalize<string>
  | Exclude<ReactNode, string | number | bigint | boolean | null | undefined>;

type StaticPathObject = {
  path: `/${
    | Exclude<TypeStaticPaths[number], "home">
    | TaskDynamicPaths[number]
    | ""}`;
  type: "static";
};

type StaticPathObjectWithDynamicPart = {
  path: (...args: string[]) => `/${string}`;
  type: "dynamicPart";
};

export type TypeStaticPathObject = {
  key: Uppercase<string>;
  name: TypeNameOfRoute;
} & (StaticPathObject | StaticPathObjectWithDynamicPart);

export type TypeDynamicPathObject = {
  key: Uppercase<string>;
  path: (...args: string[]) => `/${string}`;
  type: "dynamic";
  actionName: TypeNameOfRoute | null;
};
