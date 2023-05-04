import React from "react";
import { TRPCProvider } from "../../utils/trpc";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Layout } from "../../components/layout";
import { StatusBar, TouchableOpacity } from "react-native";
import { Stack, Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons";

export default function SignedinLayout(): React.ReactElement {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"login"} />;
  }

  return (
    <TRPCProvider>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            title: "TakeBox",
            headerStyle: {
              backgroundColor: "#2e026d",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: () => (
              <TouchableOpacity className="rounded-full bg-white p-1">
                <MaterialIcons name="person" size={16} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        <StatusBar />
      </SafeAreaProvider>
    </TRPCProvider>
  );
}
