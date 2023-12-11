import React from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Redirect, Stack, useRouter } from "expo-router";
import { useAuth, useOAuth } from "@clerk/clerk-expo";

import { CustomSafeAreaProvider } from "~/components/custom-safe-area-provider";
import EmailSignIn from "~/components/email-login/email-signin";
import EmailSignUp from "~/components/email-login/email-signup";
import { IconButton } from "~/components/icon-button/icon-button";
import { SignInWithAppleButton } from "~/components/sign-in-with-apple-button";
import { ThemeableText } from "~/components/themeable/themable-text";
import { useLoginInput } from "~/hooks/use-login-input";
import { appName } from "../../constants";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const appleSignIn = useOAuth({ strategy: "oauth_apple" });

  const { isSignedIn } = useAuth();

  const { loginInput, dispatchLoginInput } = useLoginInput();

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
    <CustomSafeAreaProvider isColorfulBackground={false}>
      <View className="flex h-full flex-col bg-slate-950 px-4">
        <View className="flex h-1/2 flex-col items-center pt-4">
          <Image
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            source={require("../../../assets/splash.png")}
            className="h-full w-full rounded-xl"
            contentFit="contain"
            alt="App Logo"
          />
        </View>
        <Stack.Screen options={{ header: () => null }} />

        <View className="flex h-1/2 flex-col justify-between pb-8">
          <EmailSignIn
            loginInputState={loginInput}
            dispatchLoginInput={dispatchLoginInput}
          />
          <View className="-mt-8 h-px w-11/12 self-center bg-gray-300"></View>
          <SignInWithAppleButton onPress={handleSignInWithApple} />
        </View>
      </View>
    </CustomSafeAreaProvider>
  );
};

export default SignInWithOAuth;
