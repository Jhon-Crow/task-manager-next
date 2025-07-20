export function kebabToUpperCamel(component: string): string {
  return component
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}
