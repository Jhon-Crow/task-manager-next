import path from "path";
import { kebabToUpperCamel } from "../utils/kebabToCamel";
import { promises as fs } from "fs";
import { templateComponent } from "../templates/templateComponent";

export const createSharedComponent = async (
  component: string,
  rootDir: string
) => {
  const sharedDir = path.join(rootDir, "src", "shared", "ui");
  const componentName = kebabToUpperCamel(component);
  const componentDir = path.join(sharedDir, componentName);
  await fs.mkdir(componentDir);

  const componentFilename = path.join(componentDir, `${component}.tsx`);
  await fs.writeFile(componentFilename, templateComponent(component));

  const indexContent = `export * from "./${componentName}/${component}";\n`;
  const indexFilename = path.join(sharedDir, "index.ts");
  await updateSharedPublic(indexFilename, indexContent);
};

const updateSharedPublic = async (
  indexFilename: string,
  indexContent: string
) => {
  const sharedIndexTemp = await fs.readFile(indexFilename, "utf-8");
  const haveLF = sharedIndexTemp.charAt(sharedIndexTemp.length - 1) === "\n";
  await fs.writeFile(
    indexFilename,
    sharedIndexTemp + (haveLF ? indexContent : `\n${indexContent}`)
  );
};
