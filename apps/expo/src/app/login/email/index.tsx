import React, { useReducer, useState } from "react";
import { Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { StyledButton } from "~/components/button";
import { CustomSafeAreaProvider } from "~/components/custom-safe-area-provider";
import EmailSignIn from "~/components/email-login/email-signin";
import EmailSignUp from "~/components/email-login/email-signup";
import { type LoginInputState } from "~/components/email-login/login-input-state";

enum LoginType {
  SignUp,
  SignIn,
}

export default function Email(): React.ReactElement {
  const router = useRouter();

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

  const errorSection =
    loginInput.error && loginInput.error.length > 0 ? (
      <Text className="mx-auto w-4/5 text-center italic text-white">
        {loginInput.error}
      </Text>
    ) : (
      <></>
    );

  let content = null;
  if (loginType === LoginType.SignUp) {
    content = (
      <>
        <EmailSignUp
          loginInputState={loginInput}
          dispatchLoginInput={dispatchLoginInput}
        />
        {errorSection}
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
        {errorSection}
        <StyledButton
          onPress={() => setLoginType(LoginType.SignUp)}
          text="Sign Up instead"
        />
      </>
    );
  }

  return (
    <CustomSafeAreaProvider isColorfulBackground={true}>
      <View className="flex h-full w-full flex-col items-center bg-primary">
        <Stack.Screen options={{ header: () => null }} />
        {content}
        <View className="absolute bottom-6">
          <StyledButton onPress={() => void router.back()} text="Back" />
        </View>
      </View>
    </CustomSafeAreaProvider>
  );
}
