import { kebabToUpperCamel } from "../utils/kebabToCamel";

export const templatePublicPage = (component: string) => {
  const componentName = kebabToUpperCamel(component);
  return `import ${componentName} from "./ui/${component}"

export default ${componentName}    
`;
};
