import { NavbarBreadcrumps } from "./navbar-breadcrumps";

export async function Navbar() {
  return (
    <div className="w-full fixed top-2 flex justify-between px-12">
      <NavbarBreadcrumps />
    </div>
  );
}
