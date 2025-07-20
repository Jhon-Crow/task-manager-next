import { kebabToUpperCamel } from "../utils/kebabToCamel";

export const templatePage = (component: string) => {
  const componentName = kebabToUpperCamel(component);
  return `import { ComponentProps } from "react"
import { cn } from "@/shared/lib/utils"
  
type ${componentName}Props = {} & ComponentProps<'div'>

export default function ${componentName}({className, ...props}:${componentName}Props){
    return (<div className={cn("", className)} {...props} ></div>)
}
`;
};
