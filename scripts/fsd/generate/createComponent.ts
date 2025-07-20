import path from "path";
import { promises as fs } from "fs";
import { FSDLayer } from "../types";
import { templateComponent } from "../templates/templateComponent";
import { templatePublic } from "../templates/templatePublic";
import { templatePage } from "../templates/templatePage";
import { templatePublicPage } from "../templates/templatePublicPage";

export const createComponent = async (
  layer: Exclude<FSDLayer, "shared">,
  component: string,
  rootDir: string
): Promise<void> => {
  const isPage = layer === "pages";
  const componentName = isPage
    ? !component.endsWith("-page")
      ? component + "-page"
      : component
    : component;
  const sliceDir = path.join(rootDir, "src", layer, componentName);

  const componentDir = path.join(sliceDir, "ui");

  await fs.mkdir(componentDir);

  const componentFilename = path.join(componentDir, `${componentName}.tsx`);

  await fs.writeFile(
    componentFilename,
    isPage ? templatePage(componentName) : templateComponent(component)
  );
  const indexFilename = path.join(sliceDir, "index.ts");
  await fs.writeFile(
    indexFilename,
    isPage ? templatePublicPage(componentName) : templatePublic(component)
  );
};
