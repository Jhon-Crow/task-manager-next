"use client";

import { useSelectTotalTasks } from "@/entities/task/model/selectors/selectTaskList";
import React from "react";

export default function Count() {
  const total = useSelectTotalTasks();
  return <div>{total}</div>;
}
