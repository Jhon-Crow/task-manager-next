import { checkAuth } from "@/entities/auth";
import { NavbarBreadcrumps } from "./navbar-breadcrumps";

export async function Navbar() {
  const session = await checkAuth();
  return (
    <div className="w-full fixed top-2 flex justify-between px-12">
      <NavbarBreadcrumps session={session} />
    </div>
  );
}
