import { useAuth, useOAuth } from "@clerk/clerk-expo";
import React from "react";
import { Text, View } from "react-native";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { appName } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { IconButton } from "../../components/icon-button";

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const discordSignIn = useOAuth({ strategy: "oauth_discord" });
  const appleSignIn = useOAuth({ strategy: "oauth_apple" });
  const googleSignIn = useOAuth({ strategy: "oauth_google" });

  const { isSignedIn } = useAuth();

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
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, [googleSignIn]);

  const handleSignInWithDiscordPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } =
        await discordSignIn.startOAuthFlow();
      if (createdSessionId && setActive) {
        void setActive({ session: createdSessionId });
      } else {
        throw new Error(
          "There are unmet requirements, modifiy this else to handle them",
        );
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, [discordSignIn]);

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
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, [appleSignIn]);

  if (isSignedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="flex h-full flex-col bg-primary px-4">
      <Text className="w-full pt-8 text-center text-3xl capitalize text-white">{`Sign in to use ${appName}`}</Text>
      <Text className="w-full px-6 py-8 text-center text-lg text-gray-200">
        After this you can start exploring the culinary delights around you.
      </Text>
      <View>
        <IconButton
          text="Sign in with Apple"
          onPress={() => void handleSignInWithApple()}
          iconName="apple"
        />
        <IconButton
          text="Sign in with Discord"
          onPress={() => void handleSignInWithDiscordPress()}
          iconName="discord"
        />
        <IconButton
          text="Sign in with Google"
          onPress={() => void handleSignInWithGoogle()}
          iconName="google"
        />
      </View>
    </SafeAreaView>
  );
};

export default SignInWithOAuth;
