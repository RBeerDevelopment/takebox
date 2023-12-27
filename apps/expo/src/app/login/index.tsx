import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Redirect, Stack } from "expo-router";
import { useAuth, useOAuth } from "@clerk/clerk-expo";

import { CustomSafeAreaProvider } from "~/components/custom-safe-area-provider";
import { EmailSection } from "~/components/email-login/email-section";
import { SignInWithAppleButton } from "~/components/sign-in-with-apple-button";
import { useKeyboardVisible } from "~/hooks/use-keyboard-visible";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const appleSignIn = useOAuth({ strategy: "oauth_apple" });

  const { isSignedIn } = useAuth();

  const isKeyboardVisibile = useKeyboardVisible();

  const handleSignInWithApple = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } =
        await appleSignIn.startOAuthFlow();

      if (createdSessionId && setActive) {
        void setActive({ session: createdSessionId });
      } else {
        throw new Error(
          "There are unmet requirements, modifiy this else to handle them",
        );
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [appleSignIn]);

  if (isSignedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <CustomSafeAreaProvider>
      <TouchableWithoutFeedback
        className="h-full w-full"
        onPress={() => Keyboard.dismiss()}
      >
        <KeyboardAvoidingView
          className="flex h-full w-full flex-col bg-slate-950 px-4"
          behavior="height"
        >
          <View className="flex h-2/5 flex-col items-center pt-4">
            <Image
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              source={require("../../../assets/splash.png")}
              className="h-full w-full rounded-xl"
              contentFit="contain"
              alt="App Logo"
            />
          </View>
          <Stack.Screen options={{ header: () => null }} />

          <View className="flex h-3/5 flex-col justify-between pb-8">
            <EmailSection />
            <View
              className={`flex flex-col ${isKeyboardVisibile ? "hidden" : ""}`}
            >
              <View className="-mt-20 mb-8 h-px w-11/12 self-center bg-gray-300"></View>

              <SignInWithAppleButton
                onPress={() => void handleSignInWithApple()}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </CustomSafeAreaProvider>
  );
};

export default SignInWithOAuth;
