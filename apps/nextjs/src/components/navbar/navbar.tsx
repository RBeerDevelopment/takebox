import React from "react";

import { NavbarLink } from "./navbar-link";
import { NavbarUser } from "./navbar-user";

interface NavbarLink {
  label: string;
  href: string;
}

const navbarLinks: NavbarLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Features",
    href: "/#app",
  },
  {
    label: "About",
    href: "/#about",
  },
];

export function Navbar(): React.ReactElement {
  return (
    <section className="mt-4 flex h-24 w-full flex-row justify-between py-8 pl-32 pr-20 text-xl font-semibold uppercase text-black ">
      <div className="flex flex-row gap-20">
        {navbarLinks.map((l) => (
          <NavbarLink href={l.href} label={l.label} key={l.href} />
        ))}
      </div>
      <NavbarUser />
    </section>
  );
}
