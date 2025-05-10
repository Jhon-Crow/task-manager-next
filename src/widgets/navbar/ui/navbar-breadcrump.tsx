import { memo, NamedExoticComponent } from "react";
import { TypeBreadcrumps } from "../model/types/navbar";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Skeleton,
} from "@/shared/ui";
import { useSelectTaskTitle } from "@/entities/task/model/selectors/selectTask";
import { PagesForNavbar } from "@/shared/lib/slices/currentPage/public-types";

type TypeBreadcrumpContainer = TypeBreadcrumps & {
  isLast: boolean;
};

const DefaultBreadcrump = memo(function BreadcrumbContainer({
  name,
  path,
  isLast,
  type,
}: TypeBreadcrumpContainer) {
  if (type == "dynamic") {
    name = <Skeleton className="w-40 h-3" />;
  }

  return !isLast ? (
    <BreadcrumbLink href={path}>{name}</BreadcrumbLink>
  ) : (
    <BreadcrumbPage>{name}</BreadcrumbPage>
  );
});

const TaskNameBreadcrump = memo(function TaskNameBreadcrumb({
  isLast,
  path,
}: TypeBreadcrumpContainer) {
  const title = useSelectTaskTitle();

  return (
    <DefaultBreadcrump
      type="tasks/[id]"
      isLast={isLast}
      path={path}
      name={title || "Задача"}
    />
  );
});

const BreadcrumpMapper: Record<
  NonNullable<PagesForNavbar>,
  NamedExoticComponent<TypeBreadcrumpContainer>
> = {
  home: DefaultBreadcrump,
  "tasks/[id]": TaskNameBreadcrump,
};

const BreadcrumpContainer = memo(function BreadcrumbContainer({
  type,
  ...props
}: TypeBreadcrumpContainer & { type: TypeBreadcrumps["type"] }) {
  const Breadcrump = BreadcrumpMapper[type as NonNullable<PagesForNavbar>];
  if (!Breadcrump) {
    return <DefaultBreadcrump {...props} type={type} />;
  }
  return <Breadcrump {...props} type={type} />;
});

export const NavbarBreadcrump = memo(function NavbarBreadcrump({
  path,
  name,
  type,
  isLast,
}: TypeBreadcrumps & { isLast: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {
        <BreadcrumbItem>
          <BreadcrumpContainer
            path={path}
            name={name}
            type={type}
            isLast={isLast}
          />
        </BreadcrumbItem>
      }
      {!isLast && <BreadcrumbSeparator />}
    </div>
  );
});
