import { kebabToUpperCamel } from "../utils/kebabToCamel";

export const templateComponent = (component: string) => {
  const componentName = kebabToUpperCamel(component);
  return `import { ComponentProps } from "react"
import { cn } from "@/shared/lib/utils"
  
type ${componentName}Props = {} & ComponentProps<'div'>

export const ${componentName} = ({className, ...props}:${componentName}Props) => {
    return (<div className={cn("", className)} {...props} ></div>)
}
`;
};
