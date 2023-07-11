import React from "react";
import { TRPCProvider } from "../../utils/api";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, StatusBar, TouchableOpacity } from "react-native";
import { Stack, Redirect, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons";

export default function SignedinLayout(): React.ReactElement {
  const router = useRouter();

  const auth = useAuth();
  if (!auth.isSignedIn) {
    return <Redirect href={"login"} />;
  }

  

  return (
    <TRPCProvider>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            title: "TakeBox",
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: () => (
              <TouchableOpacity
                className="rounded-full bg-white p-1"
                onPress={() => void auth.signOut()}
              >
                <MaterialIcons name="person" size={24} color="black" />
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
                <Button title="Close" onPress={() => router.back()} />
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
