import React from "react";
import Link from "next/link";

interface Props {
  label: string;
  href: string;
}
export function NavbarLink(props: Props): React.ReactElement {
  const { label, href } = props;

  return <Link href={href}>{label}</Link>;
}
