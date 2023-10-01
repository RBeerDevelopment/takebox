import React from "react";
import { SafeAreaView, View } from "react-native";
import { Redirect, Stack, useRouter } from "expo-router";
import { useAuth, useOAuth } from "@clerk/clerk-expo";

import { IconButton } from "~/components/icon-button/icon-button";
import { ThemeableText } from "~/components/themeable/themable-text";
import { appName } from "../../constants";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const appleSignIn = useOAuth({ strategy: "oauth_apple" });
  const googleSignIn = useOAuth({ strategy: "oauth_google" });

  const { isSignedIn } = useAuth();

  const router = useRouter();

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

  const handleSignInWithGoogle = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } =
        await googleSignIn.startOAuthFlow();

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
  }, [googleSignIn]);

  if (isSignedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-primary">
      <View className="flex h-full flex-col bg-primary px-4">
        <Stack.Screen options={{ header: () => null }} />
        <ThemeableText className="w-full pt-8 text-center text-3xl capitalize">{`Sign in to use ${appName}`}</ThemeableText>
        <ThemeableText className="w-full px-6 py-8 text-center text-lg text-gray-200">
          After this you can start exploring the culinary delights around you.
        </ThemeableText>

        <View>
          <IconButton
            onPress={() => router.push("/login/email")}
            text="Sign in with mail"
            iconName="email"
          />

          <IconButton
            text="Sign in with Apple"
            onPress={() => void handleSignInWithApple()}
            iconName="apple"
          />
          <IconButton
            text="Sign in with Google"
            onPress={() => void handleSignInWithGoogle()}
            iconName="google"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInWithOAuth;
