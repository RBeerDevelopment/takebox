import { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

import { isClerkError } from "~/utils/validation/isClerkError";
import { StyledButton } from "../button";
import { ThemeableText } from "../themeable/themable-text";
import { type EmailLoginProps } from "./email-login-props";
import { LoginInputField } from "./login-input-field";
import { emailLoginSchema } from "./validation";

export default function EmailSignUp(props: EmailLoginProps) {
  const { loginInputState, dispatchLoginInput } = props;
  const { isLoaded, signUp, setActive } = useSignUp();

  const { emailAddress, username, password } = loginInputState;

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const router = useRouter();

  // start the sign up process.
  async function onSignUpPress() {
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

    dispatchLoginInput({
      error: undefined,
    });

    try {
      await signUp.create({
        emailAddress,
        password,
        username,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
      if (isClerkError(err)) {
        dispatchLoginInput({ error: err.errors[0]?.message || "Input error" });
      }
    }
  }

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      router.replace("/home");
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="mb-4 w-11/12">
      <ThemeableText className="w-full p-6 text-center text-xl font-semibold">
        Sign Up with Email
      </ThemeableText>
      {!pendingVerification && (
        <View className="flex flex-col items-center">
          <LoginInputField
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(newEmailAddress) =>
              dispatchLoginInput({ emailAddress: newEmailAddress })
            }
          />

          <LoginInputField
            autoCapitalize="none"
            value={username}
            placeholder="Username..."
            onChangeText={(newUsername) =>
              dispatchLoginInput({ username: newUsername })
            }
          />

          <LoginInputField
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(newPassword) =>
              dispatchLoginInput({ password: newPassword })
            }
          />

          <StyledButton
            buttonStyle="bg-white w-1/3"
            textStyle="text-primary dark:text-primary-dark"
            onPress={() => void onSignUpPress()}
            text="Sign up"
          />
        </View>
      )}
      {pendingVerification && (
        <View className="flex flex-col items-center">
          <LoginInputField
            value={code}
            placeholder="Code..."
            onChangeText={setCode}
          />
          <StyledButton
            buttonStyle="bg-white w-1/3"
            textStyle="text-primary dark:text-primary-dark"
            onPress={() => void onPressVerify()}
            text="Verify Email"
          />

          <StyledButton
            onPress={() => setPendingVerification(false)}
            text="Cancel"
          />
        </View>
      )}
    </View>
  );
}
