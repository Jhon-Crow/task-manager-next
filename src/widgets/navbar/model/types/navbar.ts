import { PagesForNavbar } from "@/shared/lib/slices/currentPage/public-types";
import { TypeNameOfRoute } from "@/shared/types";

type TypeOfBreadcrump =
  | "static"
  | "dynamic"
  | "dynamicPart"
  | NonNullable<PagesForNavbar>;

export type TypeBreadcrumps = {
  path: string;
  name: TypeNameOfRoute;
  type: TypeOfBreadcrump;
};
export type TypeActionBreadcrumps = {
  path: string;
  name: string;
};
