import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { CustomSafeAreaProvider } from "~/components/custom-safe-area-provider";
import { IconOnlyButton } from "~/components/icon-button";

export default function ProfileLayout(): React.ReactElement {
  const auth = useAuth();
  if (!auth.isSignedIn) {
    return <Redirect href="login" />;
  }

  return (
    <CustomSafeAreaProvider>
      <Stack
        screenOptions={{
          title: "Profile",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerStyle: {
            backgroundColor: "#020617",
          },
          headerRight: () => (
            <IconOnlyButton
              iconName="settings"
              iconFont="material"
              iconColor="white"
              onPress={() => {
                return;
              }}
            />
          ),
        }}
      >
        <Stack.Screen
          name="overview"
          options={{
            title: "Profile",
          }}
        />
        <Stack.Screen
          name="username-setup/modal"
          options={{
            presentation: "modal",
            title: "Username",
            headerLeft: undefined,
            headerRight: undefined,
          }}
        />
      </Stack>
    </CustomSafeAreaProvider>
  );
}
