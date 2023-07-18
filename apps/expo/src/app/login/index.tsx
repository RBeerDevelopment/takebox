import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { useAuth, useOAuth, useUser } from "@clerk/clerk-expo";

import { api } from "~/utils/api";
import { ThemeableText } from "~/components/themeable/themable-text";
import { IconButton } from "../../components/icon-button/icon-button";
import { appName } from "../../constants";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const appleSignIn = useOAuth({ strategy: "oauth_apple" });
  // const googleSignIn = useOAuth({ strategy: "oauth_google" });

  const { isSignedIn } = useAuth();
  const { user } = useUser();

  // const upsertUser = api.user.upsert.useMutation();

  // React.useEffect(() => {
  //   console.log("useEffect ran");
  //   if (!user) return;

  //   upsertUser.mutate({ username: user.username || undefined });
  // }, [user, upsertUser]);

  // const handleSignInWithGoogle = React.useCallback(async () => {
  //   try {
  //     const { createdSessionId, setActive } =
  //       await googleSignIn.startOAuthFlow();
  //     if (createdSessionId && setActive) {
  //       void setActive({ session: createdSessionId });
  //     } else {
  //       throw new Error(
  //         "There are unmet requirements, modifiy this else to handle them",
  //       );
  //     }
  //   } catch (err) {
  //     console.log(JSON.stringify(err, null, 2));
  //     console.log("error signing in", err);
  //   }
  // }, [googleSignIn]);

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
      <ThemeableText className="w-full pt-8 text-center text-3xl capitalize">{`Sign in to use ${appName}`}</ThemeableText>
      <ThemeableText className="w-full px-6 py-8 text-center text-lg text-gray-200">
        After this you can start exploring the culinary delights around you.
      </ThemeableText>
      {/* Disable email sign up for now */}
      {/* <EmailSignUp /> */}
      <View>
        <IconButton
          text="Sign in with Apple"
          onPress={() => void handleSignInWithApple()}
          iconName="apple"
        />
        {/* <IconButton
          text="Sign in with Google"
          onPress={() => void handleSignInWithGoogle()}
          iconName="google"
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default SignInWithOAuth;
