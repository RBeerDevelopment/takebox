import React from "react";

import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "../utils/cache";
import Constants from "expo-constants";
import { Slot } from "expo-router";
import { useRequestLocation } from "../hooks/use-request-location";
import Toast from "react-native-toast-message";

export default function App() {
  useRequestLocation();

  return (
    <>
      <ClerkProvider
        publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <Slot />
      </ClerkProvider>
      <Toast />
    </>
  );
}
