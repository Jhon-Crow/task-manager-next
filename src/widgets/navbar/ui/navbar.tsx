import { checkAuth } from "@/entities/auth";
import { NavbarBreadcrumps } from "./navbar-breadcrumps";
import { ToggleTheme } from "@/features/theme-toggle";
import { NavbarSignout } from "./navbar-signout";

export async function Navbar() {
  const session = await checkAuth();
  return (
    <div className="w-full fixed top-2 flex justify-between px-12">
      <NavbarBreadcrumps />
      <div className="flex items-center gap-x-4">
        <NavbarSignout session={session} />
        <ToggleTheme className="" />
      </div>
    </div>
  );
}
