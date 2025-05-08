import { ReactElement } from "react";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

export type TypeField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = (
  props: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
    className?: string;
  }
) => ReactElement;
