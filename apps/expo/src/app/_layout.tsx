import React from "react";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";

import { TRPCProvider } from "~/utils/api";
import { ModalCloseButton } from "~/components/modal-close-button";
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
        <TRPCProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerStyle: {
                backgroundColor: "#020617",
              },
            }}
          >
            <Stack.Screen
              name="(modals)/review/new"
              options={{
                headerShown: true,
                presentation: "modal",
                title: "Review",
                headerTitleAlign: "center",
                headerLeft: () => <ModalCloseButton />,
                headerRight: undefined,
              }}
            />
            <Stack.Screen
              name="(modals)/review/detail/[id]"
              options={{
                headerShown: true,
                presentation: "modal",
                title: "Review",
                headerTitleAlign: "center",
                headerLeft: () => <ModalCloseButton />,
                headerRight: undefined,
              }}
            />
          </Stack>
        </TRPCProvider>
      </ClerkProvider>
      <Toast />
    </>
  );
}
