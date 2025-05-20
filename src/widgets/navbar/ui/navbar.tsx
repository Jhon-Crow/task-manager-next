import { NavbarBreadcrumps } from "./navbar-breadcrumps";

export async function Navbar() {
  return (
    <div className="w-full flex justify-between px-12">
      <NavbarBreadcrumps />
    </div>
  );
}
