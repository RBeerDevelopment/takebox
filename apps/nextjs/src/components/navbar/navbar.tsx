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
    label: "About",
    href: "/#about",
  },
  {
    label: "App",
    href: "/#app",
  },
];

export function Navbar(): React.ReactElement {
  return (
    <section className="border-black/200 mt-4 flex h-24 w-full flex-row justify-between border border-y-[0.1] py-8 pl-32 pr-20 text-xl font-semibold uppercase text-black ">
      <div className="flex flex-row gap-20">
        {navbarLinks.map((l) => (
          <NavbarLink href={l.href} label={l.label} key={l.href} />
        ))}
      </div>
      <NavbarUser />
    </section>
  );
}
