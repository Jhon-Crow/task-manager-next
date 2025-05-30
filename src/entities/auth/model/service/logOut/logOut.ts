"use server";

import { Routes } from "@/shared/routes/paths";
import { signOut } from "../auth/auth";

export const logOut = async () => {
  await signOut({ redirectTo: Routes.LOGIN });
};
