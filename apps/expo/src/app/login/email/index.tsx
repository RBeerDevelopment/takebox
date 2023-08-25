import React, { useReducer, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { StyledButton } from "~/components/button";
import EmailSignIn from "~/components/email-login/email-signin";
import EmailSignUp from "~/components/email-login/email-signup";
import { type LoginInputState } from "~/components/email-login/login-input-state";

enum LoginType {
  SignUp,
  SignIn,
}

export default function Email(): React.ReactElement {
  const router = useRouter();

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  console.log({ isLoaded, userId, sessionId, getToken });

  const [loginType, setLoginType] = useState(LoginType.SignUp);

  const [loginInput, dispatchLoginInput] = useReducer(
    (state: LoginInputState, newState: Partial<LoginInputState>) => ({
      ...state,
      ...newState,
    }),
    {
      emailAddress: "",
      username: "",
      password: "",
    },
  );

  let content = null;
  if (loginType === LoginType.SignUp) {
    content = (
      <>
        <EmailSignUp
          loginInputState={loginInput}
          dispatchLoginInput={dispatchLoginInput}
        />
        {loginInput.error && loginInput.error.length > 0 ? (
          <Text className="w-full text-center text-lg italic text-white">
            {loginInput.error}
          </Text>
        ) : null}
        <StyledButton
          onPress={() => setLoginType(LoginType.SignIn)}
          text="Sign In instead"
        />
      </>
    );
  } else {
    content = (
      <>
        <EmailSignIn
          loginInputState={loginInput}
          dispatchLoginInput={dispatchLoginInput}
        />
        {loginInput.error && loginInput.error.length > 0 ? (
          <Text className="w-full text-center text-lg italic text-white">
            {loginInput.error}
          </Text>
        ) : null}
        <StyledButton
          onPress={() => setLoginType(LoginType.SignUp)}
          text="Sign Up instead"
        />
      </>
    );
  }

  return (
    <SafeAreaView className="bg-primary">
      <View className="flex h-full w-full flex-col items-center bg-primary">
        <Stack.Screen options={{ header: () => null }} />
        {content}
        <View className="absolute bottom-6">
          <StyledButton onPress={() => void router.back()} text="Back" />
        </View>
      </View>
    </SafeAreaView>
  );
}
