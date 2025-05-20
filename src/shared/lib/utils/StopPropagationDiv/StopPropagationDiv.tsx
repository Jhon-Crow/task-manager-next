"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const StopPropagationDiv = ({ children }: Props) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};
