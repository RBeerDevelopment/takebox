import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function InitialScreen() {
  return (
    <>
      <SignedIn>
        <Redirect href={"/home"} />
      </SignedIn>
      <SignedOut>
        <Redirect href={"/login"} />
      </SignedOut>
    </>
  );
}
