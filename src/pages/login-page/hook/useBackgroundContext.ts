"use client";

import { useContext } from "react";
import { BackgroundContext } from "../context/BackgroundContext";

export const useBackgroundContext = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error(
      "useBackgroundContext должен использоваться внутри BackgroundProvider"
    );
  }
  return context;
};
