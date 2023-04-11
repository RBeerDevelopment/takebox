import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  label: string;
  href: string;
}
export function NavbarLink(props: Props): React.ReactElement {
  const { label, href } = props;
  const router = useRouter();

  const isActive = router.asPath === href;

  return (
    <Link href={href} className={`${isActive ? "text-primary" : "text-black"}`}>
      {label}
    </Link>
  );
}
