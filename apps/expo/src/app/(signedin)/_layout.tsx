import React from "react";
import { Button, StatusBar, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Redirect, Stack, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons";

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
      <SafeAreaProvider className="">
        <Stack
          screenOptions={{
            title: "Flavoury",
            headerTintColor: isDarkMode ? "#fff" : "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerStyle: {
              backgroundColor: isDarkMode ? "#020617" : "#fff",
            },
            headerRight: () => (
              <TouchableOpacity
                className="rounded-full bg-white p-1 dark:bg-slate-950"
                onPress={() => void router.push("/profile/modal")}
              >
                <MaterialIcons
                  name="person"
                  size={24}
                  color={isDarkMode ? "white" : "black"}
                />
              </TouchableOpacity>
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
                  color={isDarkMode ? "#FF4FC4" : "#F191A8"}
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
                  color={isDarkMode ? "#FF4FC4" : "#F191A8"}
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
