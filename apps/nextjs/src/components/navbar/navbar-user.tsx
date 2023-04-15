import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export function NavbarUser(): React.ReactElement {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: {
              width: "3rem",
              height: "3rem",
            },
          },
        }}
      />
    );
  }

  return (
    <button className="btn btn-primary text-white">
      <Link href="/sign-in">Sign In</Link>
    </button>
  );
}
