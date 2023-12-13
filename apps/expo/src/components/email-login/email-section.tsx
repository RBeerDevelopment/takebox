import React, { useReducer, useState } from "react";
import { View } from "react-native";

import { StyledButton } from "~/components/button";
import EmailSignIn from "~/components/email-login/email-signin";
import EmailSignUp from "~/components/email-login/email-signup";
import { useKeyboardVisible } from "~/hooks/use-keyboard-visible";
import { type LoginInputState } from "~/types/login-input-state";
import { ThemeableText } from "../themeable/themable-text";

type LoginType = "signIn" | "signUp";

export function EmailSection(): React.ReactElement {
  const [loginType, setLoginType] = useState<LoginType>("signIn");

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
  const isKeyboardVisibile = useKeyboardVisible();

  return (
    <View className="flex h-1/2 flex-col">
      {loginType === "signUp" ? (
        <EmailSignUp
          loginInputState={loginInput}
          dispatchLoginInput={dispatchLoginInput}
        />
      ) : (
        <EmailSignIn
          loginInputState={loginInput}
          dispatchLoginInput={dispatchLoginInput}
        />
      )}
      <ThemeableText
        className={`mx-auto w-full text-center italic ${
          loginInput.error && loginInput.error.length > 0 ? "" : "hidden"
        }`}
      >
        {loginInput.error}
      </ThemeableText>
      <StyledButton
        buttonStyle={isKeyboardVisibile ? "hidden" : ""}
        onPress={() =>
          setLoginType((prev) => (prev === "signIn" ? "signUp" : "signIn"))
        }
        text={loginType === "signIn" ? "Create Account" : "Login"}
      />
    </View>
  );
}
