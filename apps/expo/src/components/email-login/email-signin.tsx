import { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

import { isClerkError } from "~/utils/validation/isClerkError";
import { StyledButton } from "../button";
import { type EmailLoginProps } from "./email-login-props";
import { LoginInputField } from "./login-input-field";
import { emailLoginSchema } from "./validation";

export default function EmailSignIn(props: EmailLoginProps) {
  const { loginInputState, dispatchLoginInput } = props;
  const { isLoaded, signIn, setActive } = useSignIn();

  const [isProcessingSignIn, setIsProcessingSignIn] = useState(false);

  const router = useRouter();

  const { emailAddress, password } = loginInputState;
  // start the sign up process.
  async function onSignInPress() {
    if (!isLoaded) {
      return;
    }

    const isValid = emailLoginSchema.safeParse({ emailAddress, password });

    if (!isValid.success) {
      dispatchLoginInput({
        error: isValid.error.errors[0]?.message || "Input error",
      });
      return;
    }

    setIsProcessingSignIn(true);

    dispatchLoginInput({ error: undefined });

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      router.replace("/home");
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
      if (isClerkError(err)) {
        dispatchLoginInput({ error: err.errors[0]?.message || "Input error" });
      }
    } finally {
      setIsProcessingSignIn(false);
    }
  }

  return (
    <View className="flex w-full flex-col">
      <LoginInputField
        autoCapitalize="none"
        autoComplete="email"
        value={emailAddress}
        label="Email"
        placeholder="name@example.com"
        onChangeText={(newEmailAddress) => {
          dispatchLoginInput({ emailAddress: newEmailAddress });
        }}
      />

      <LoginInputField
        value={password}
        label="Password"
        autoComplete="password"
        placeholder="********"
        secureTextEntry={true}
        onChangeText={(newPassword) => {
          dispatchLoginInput({ password: newPassword });
        }}
      />

      <StyledButton
        buttonStyle="w-full"
        colorful
        onPress={() => void onSignInPress()}
        text={isProcessingSignIn ? "Loading..." : "Login"}
      />
    </View>
  );
}
