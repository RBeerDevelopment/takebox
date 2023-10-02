import React from "react";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";

import { TRPCProvider } from "~/utils/api";
import { useRequestLocation } from "../hooks/use-request-location";
import { tokenCache } from "../utils/cache";

export default function App() {
  useRequestLocation();

  return (
    <TRPCProvider>
      <ClerkProvider
        publishableKey={
          Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY as string
        }
        tokenCache={tokenCache}
      >
        <Stack screenOptions={{ header: () => null }} />
      </ClerkProvider>
      <Toast />
    </TRPCProvider>
  );
}
