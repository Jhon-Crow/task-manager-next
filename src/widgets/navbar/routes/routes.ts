import { Routes, staticPaths, dynamicPaths } from "@/shared/routes/paths";
import { TypeActionBreadcrumps, TypeBreadcrumps } from "../model/types/navbar";
import { PagesForNavbar } from "@/shared/lib/slices/currentPage/model/types/CurrentPageSchema";

const mappingKeys = [
  ...Object.keys(staticPaths),
  ...Object.keys(dynamicPaths),
] as unknown as keyof typeof staticPaths | keyof typeof dynamicPaths;

const rootBreadctump: TypeBreadcrumps = {
  name: staticPaths.home.name,
  path: staticPaths.home.path,
  type: "static",
};

const rootActions: TypeActionBreadcrumps[] = [
  {
    name: "Задачи",
    path: `.${Routes.TASKS_LIST}`,
  },
  {
    name: "Пользователи",
    path: `.${Routes.USERS_LIST}`,
  },
];

export function getBreadcrumbs(
  currentPage: PagesForNavbar,
  segments?: string[]
): [TypeBreadcrumps[], TypeActionBreadcrumps[]] {
  const breadcrumps: TypeBreadcrumps[] = [];

  breadcrumps.push(rootBreadctump);
  if (!segments) {
    return [breadcrumps, rootActions];
  }
  let mappingPath = "";
  let currentPath = "";
  const lastSegmentIndex = segments.length - 1;
  const actions: TypeActionBreadcrumps[] = [];
  segments.forEach((segment, i) => {
    mappingPath += `${mappingPath ? "/" : ""}${segment}`;
    currentPath += `${currentPage ? "/" : ""}${segment}`;
    let isDinamic = false;
    const isLast = lastSegmentIndex == i;

    let matchedKey: string | undefined;

    for (const key of mappingKeys) {
      const keySegments = key.split("/");
      isDinamic = false;
      if (keySegments.length !== i + 1) {
        continue;
      }

      let isMatch = true;
      let tempMappingPath = "";
      for (let j = 0; j <= i; j++) {
        const keySeg = keySegments[j];
        const actualSeg = segments[j];

        if (keySeg.startsWith("[") && keySeg.endsWith("]")) {
          isDinamic = true;
          tempMappingPath += `${tempMappingPath ? "/" : ""}${keySeg}`;
        } else {
          isDinamic = false;
          if (keySeg !== actualSeg) {
            isMatch = false;
            break;
          }
          tempMappingPath += `${tempMappingPath ? "/" : ""}${keySeg}`;
        }
      }
      if (isMatch) {
        matchedKey = key;
        mappingPath = tempMappingPath;
        break;
      }
    }
    if (matchedKey) {
      if (!isDinamic) {
        breadcrumps.push({
          ...staticPaths[mappingPath as keyof typeof staticPaths],
          path: currentPath,
        });
      } else {
        const pathObject =
          dynamicPaths[mappingPath as keyof typeof dynamicPaths];
        if (pathObject.type !== "dynamic") return;
        const { actionName, path } = pathObject;

        breadcrumps.push({
          name: actionName ? actionName : segment,
          path: path(segment),
          type: isDinamic
            ? mappingPath == currentPage
              ? currentPage
              : "dynamic"
            : "static",
        });
      }
      if (isLast) {
        for (const key of mappingKeys) {
          if (key.startsWith(mappingPath)) {
            const action = key.slice(mappingPath.length);

            if (action.includes("[") || action.split("/").length !== 2) {
              continue;
            }
            actions.push({
              path: `${key.slice(mappingPath.length)}`,
              name: staticPaths[
                (mappingPath + action) as keyof typeof staticPaths
              ].name as string,
            });
          }
        }
      }
    }
  });

  return [breadcrumps, actions];
}
