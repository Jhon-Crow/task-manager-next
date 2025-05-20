"use client";

import { useFormStatus } from "react-dom";
import { DeleteTaskBtn } from "./delete-task-btn";

export const DeleteTaskFormBtn = () => {
  const { pending } = useFormStatus();

  return <DeleteTaskBtn type="submit" disabled={pending} />;
};
