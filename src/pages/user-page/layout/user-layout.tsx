import { getUserById, UserProvider } from "@/entities/user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function UserLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data = await getUserById(id);
  if (!data.success || !data.data) {
    redirect("/not-found");
  }
  const user = data.data;
  return <UserProvider user={user}>{children}</UserProvider>;
}
