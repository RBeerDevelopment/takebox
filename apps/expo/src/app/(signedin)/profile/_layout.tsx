import React from "react";
import { Redirect, Stack, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { CustomSafeAreaProvider } from "~/components/custom-safe-area-provider";
import { IconOnlyButton } from "~/components/icon-button";
import { ModalCloseButton } from "~/components/modal-close-button";

export default function ProfileLayout(): React.ReactElement {
  const auth = useAuth();
  const router = useRouter();
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
                router.push("profile/settings/modal");
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
        <Stack.Screen
          name="settings/modal"
          options={{
            presentation: "modal",
            title: "Settings",
            headerLeft: () => <ModalCloseButton />,
            headerRight: undefined,
          }}
        />
      </Stack>
    </CustomSafeAreaProvider>
  );
}
