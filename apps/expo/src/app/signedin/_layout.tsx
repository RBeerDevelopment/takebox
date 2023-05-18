import React from "react";
import { TRPCProvider } from "../../utils/trpc";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, TouchableOpacity } from "react-native";
import { Stack, Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons";

export default function SignedinLayout(): React.ReactElement {
  const { isSignedIn } = useAuth();

  const auth = useAuth();
  if (!isSignedIn) {
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
                onPress={() => auth.signOut()}
              >
                <MaterialIcons name="person" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        <StatusBar />
      </SafeAreaProvider>
    </TRPCProvider>
  );
}
