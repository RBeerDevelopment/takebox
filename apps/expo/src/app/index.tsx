import { Redirect } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";

import "react-native-gesture-handler";

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
