import { useState } from "react";
import { View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";

import { StyledButton } from "../button";
import { ThemeableText } from "../themeable/themable-text";
import { type EmailLoginProps } from "./email-login-props";
import { LoginInputField } from "./login-input-field";
import { emailLoginSchema } from "./validation";

export default function EmailSignIn(props: EmailLoginProps) {
  const { emailAddress, setEmailAddress, password, setPassword, setError } =
    props;
  const { isLoaded, signIn, setActive } = useSignIn();

  // start the sign up process.
  async function onSignInPress() {
    if (!isLoaded) {
      return;
    }

    const isValid = emailLoginSchema.safeParse({ emailAddress, password });

    if (!isValid.success) {
      setError(isValid.error.errors[0]?.message || "Input error");
      return;
    }

    setError("");

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <View className="mb-4 w-11/12">
      <ThemeableText className="w-full p-6 text-center text-xl font-semibold">
        Sign In with Email
      </ThemeableText>
      <View className="flex flex-col items-center">
        <LoginInputField
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={setEmailAddress}
        />

        <LoginInputField
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        <StyledButton
          buttonStyle="bg-white w-1/3"
          textStyle="text-primary dark:text-primary-dark"
          onPress={() => void onSignInPress()}
          text="Sign in"
        />
      </View>
    </View>
  );
}
