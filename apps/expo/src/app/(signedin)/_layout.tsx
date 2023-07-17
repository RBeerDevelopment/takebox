import React from "react";
import { Button, StatusBar, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Redirect, Stack, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { IconOnlyButton } from "~/components/icon-button";
import { useDarkMode } from "~/hooks/use-dark-mode";
import { usePrimaryColor } from "~/hooks/use-primary-color";
import { TRPCProvider } from "../../utils/api";

export default function SignedinLayout(): React.ReactElement {
  const router = useRouter();

  const isDarkMode = useDarkMode();
  const primaryColor = usePrimaryColor();

  const auth = useAuth();
  if (!auth.isSignedIn) {
    return <Redirect href={"login"} />;
  }

  return (
    <TRPCProvider>
      <SafeAreaProvider className="">
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
                style="p-2"
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
              headerLeft: () => (
                <Button
                  color={primaryColor}
                  onPress={router.back}
                  title="Close"
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
              headerLeft: () => (
                <Button
                  color={primaryColor}
                  onPress={router.back}
                  title="Close"
                />
              ),
              headerRight: undefined,
            }}
          />
        </Stack>
        <StatusBar />
      </SafeAreaProvider>
    </TRPCProvider>
  );
}
