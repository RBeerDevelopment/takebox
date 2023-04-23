import { useOAuth } from "@clerk/clerk-expo";
import React from "react";
import { View, Text } from "react-native";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { StyledButton } from "./button";

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const discordSignIn = useOAuth({ strategy: "oauth_discord" });
  const appleSignIn = useOAuth({ strategy: "oauth_apple" });

  const handleSignInWithDiscordPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } =
        await discordSignIn.startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
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
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
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
    <View className="flex flex-col">
      <Text>Start using TakeBox </Text>
      <StyledButton
        text="Sign In with Discord"
        onPress={handleSignInWithDiscordPress}
      />
      <StyledButton text="Sign In with Apple" onPress={handleSignInWithApple} />
    </View>
  );
};

export default SignInWithOAuth;
