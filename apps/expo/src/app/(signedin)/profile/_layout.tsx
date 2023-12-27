import React from "react";
import { StatusBar } from "react-native";
import { Redirect, Stack, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

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
        }}
      ></Stack>
      <StatusBar />
      <UsernameHandler />
    </CustomSafeAreaProvider>
  );
}
