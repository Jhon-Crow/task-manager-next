import { kebabToUpperCamel } from "../utils/kebabToCamel";

export const templatePublic = (component: string) => {
  const componentName = kebabToUpperCamel(component);
  return `export { ${componentName} } from "./ui/${componentName}"`;
};
