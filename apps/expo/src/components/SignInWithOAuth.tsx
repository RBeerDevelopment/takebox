import { useOAuth } from "@clerk/clerk-expo";
import React from "react";
import { View, Text } from "react-native";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { StyledButton } from "./button";
import { appName } from "../constants";

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const discordSignIn = useOAuth({ strategy: "oauth_discord" });
  const appleSignIn = useOAuth({ strategy: "oauth_apple" });
  const googleSignIn = useOAuth({ strategy: "oauth_google" });

  const handleSignInWithGoogle = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } =
        await googleSignIn.startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        throw new Error(
          "There are unmet requirements, modifiy this else to handle them",
        );
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, []);

  const handleSignInWithDiscordPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } =
        await discordSignIn.startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        throw new Error(
          "There are unmet requirements, modifiy this else to handle them",
        );
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, []);

  const handleSignInWithApple = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } =
        await appleSignIn.startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        throw new Error(
          "There are unmet requirements, modifiy this else to handle them",
        );
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, []);

  return (
    <View className="flex flex-col ">
      <Text className="w-full pt-8 text-center text-3xl capitalize text-white">{`Sign in to use ${appName}`}</Text>
      <Text className="w-full py-8 px-6 text-center text-lg text-gray-200">
        After this you can start exploring the culinary delights around you.
      </Text>
      <StyledButton
        text="Sign in with Discord"
        onPress={handleSignInWithDiscordPress}
      />
      <StyledButton text="Sign in with Apple" onPress={handleSignInWithApple} />
      <StyledButton
        text="Sign in with Google"
        onPress={handleSignInWithGoogle}
      />
    </View>
  );
};

export default SignInWithOAuth;
