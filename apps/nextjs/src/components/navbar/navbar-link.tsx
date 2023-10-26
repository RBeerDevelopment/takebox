"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  label: string;
  href: string;
}
export function NavbarLink(props: Props): React.ReactElement {
  const { label, href } = props;
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link href={href} className={`${isActive ? "text-primary" : "text-black"}`}>
      {label}
    </Link>
  );
}
