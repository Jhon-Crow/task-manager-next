import { checkAuth } from "@/entities/auth";
import { NavbarBreadcrumps } from "./navbar-breadcrumps";
import {ModeToggle} from "@/features/ThemeToggle/theme-toggle";

export async function Navbar() {
  const session = await checkAuth();
  return (
    <div className="w-full fixed top-2 flex justify-between px-12">
      <NavbarBreadcrumps session={session} />
            <ModeToggle
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50"
            />
    </div>
  );
}
