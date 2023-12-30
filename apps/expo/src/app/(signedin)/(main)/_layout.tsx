import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { CustomSafeAreaProvider } from "~/components/custom-safe-area-provider";
import { UsernameHandler } from "~/components/username-handler";

export default function MainLayout(): React.ReactElement {
  const auth = useAuth();
  if (!auth.isSignedIn) {
    return <Redirect href={"login"} />;
  }

  return (
    <ActionSheetProvider>
      <CustomSafeAreaProvider>
        <Stack
          screenOptions={{
            title: "Flavoury",
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerStyle: {
              backgroundColor: "#020617",
            },
          }}
        ></Stack>
        <UsernameHandler />
      </CustomSafeAreaProvider>
    </ActionSheetProvider>
  );
}
