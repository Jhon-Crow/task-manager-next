"server-only";

import { redirect } from "next/navigation";
import { auth } from "../auth/auth";
import { Routes } from "@/shared/routes/paths";

export const checkAuth = async () => {
  const session = await auth();
  if (!session) {
    redirect(Routes.LOGIN);
  }
  return session;
};
