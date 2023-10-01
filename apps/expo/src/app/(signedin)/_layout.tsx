import React from "react";
import { StatusBar } from "react-native";
import { Redirect, Stack, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { StyledButton } from "~/components/button";
import { CustomSafeAreaProvider } from "~/components/custom-safe-area-provider";
import { IconOnlyButton } from "~/components/icon-button";
import { UsernameHandler } from "~/components/username-handler";
import { useDarkMode } from "~/hooks/use-dark-mode";
import { TRPCProvider } from "../../utils/api";

export default function SignedinLayout(): React.ReactElement {
  const router = useRouter();

  const isDarkMode = useDarkMode();

  const auth = useAuth();
  if (!auth.isSignedIn) {
    return <Redirect href={"login"} />;
  }

  return (
    <TRPCProvider>
      <CustomSafeAreaProvider>
        <Stack
          screenOptions={{
            title: "Flavoury",
            headerTintColor: isDarkMode ? "white" : "black",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerStyle: {
              backgroundColor: isDarkMode ? "black" : "white",
            },
            headerRight: () => (
              <IconOnlyButton
                onPress={() => void router.push("/profile/modal")}
                iconName="person"
                iconFont="material"
                iconColor={isDarkMode ? "white" : "black"}
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
              headerLeft: () => (
                <StyledButton
                  onPress={router.back}
                  text="Close"
                  buttonStyle="w-fit px-2"
                  textStyle="text-primary"
                />
              ),
              headerRight: undefined,
            }}
          />
          <Stack.Screen
            name="profile/modal"
            options={{
              presentation: "modal",
              title: "Profile",
              headerTitleAlign: "center",
              headerLeft: () => (
                <StyledButton
                  onPress={router.back}
                  text="Close"
                  buttonStyle="w-fit px-2"
                  textStyle="text-primary"
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
    </TRPCProvider>
  );
}
