import React from "react";
import { StatusBar } from "react-native";
import { Redirect, Stack, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { StyledButton } from "~/components/button";
import { CustomSafeAreaProvider } from "~/components/custom-safe-area-provider";
import { IconOnlyButton } from "~/components/icon-button";
import { UsernameHandler } from "~/components/username-handler";

export default function SignedinLayout(): React.ReactElement {
  const router = useRouter();

  const auth = useAuth();
  if (!auth.isSignedIn) {
    return <Redirect href={"login"} />;
  }

  const modalCloseButton = (
    <StyledButton
      onPress={router.back}
      text="Close"
      buttonStyle="w-fit pl-1 -translate-y-2"
      textStyle="text-primary"
    />
  );

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
            headerRight: () => (
              <IconOnlyButton
                onPress={() => void router.push("/settings/modal")}
                iconName="person"
                style="p-2"
                iconFont="material"
                iconColor="white"
              />
            ),
          }}
        >
          <Stack.Screen
            name="review/new"
            options={{
              presentation: "modal",
              title: "Review",
              headerTitleAlign: "center",
              headerLeft: () => modalCloseButton,

              headerRight: undefined,
            }}
          />
          <Stack.Screen
            name="review/detail/[id]"
            options={{
              presentation: "modal",
              title: "Review",
              headerTitleAlign: "center",
              headerLeft: () => modalCloseButton,
              headerRight: undefined,
            }}
          />
          <Stack.Screen
            name="settings/modal"
            options={{
              presentation: "modal",
              title: "Settings",
              headerTitleAlign: "center",
              headerLeft: () => (
                <StyledButton
                  onPress={router.back}
                  text="Close"
                  buttonStyle="w-fit px-2 -translate-y-2"
                  textStyle="text-white"
                />
              ),
              headerRight: undefined,
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
        <StatusBar />
        <UsernameHandler />
      </CustomSafeAreaProvider>
    </ActionSheetProvider>
  );
}
