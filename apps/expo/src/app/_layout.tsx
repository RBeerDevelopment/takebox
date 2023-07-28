import React from "react";
import { SafeAreaView } from "react-native";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";
import { Slot, Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";

import { useRequestLocation } from "../hooks/use-request-location";
import { tokenCache } from "../utils/cache";

export default function App() {
  useRequestLocation();

  return (
    <>
      <ClerkProvider
        publishableKey={
          Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY as string
        }
        tokenCache={tokenCache}
      >
        <Stack />
      </ClerkProvider>
      <Toast />
    </>
  );
}
