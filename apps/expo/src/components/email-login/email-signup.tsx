import { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { set } from "zod";

import { isClerkError } from "~/utils/validation/isClerkError";
import { StyledButton } from "../button";
import { type EmailLoginProps } from "./email-login-props";
import { LoginInputField } from "./login-input-field";
import { emailLoginSchema } from "./validation";

export default function EmailSignUp(props: EmailLoginProps) {
  const { loginInputState, dispatchLoginInput } = props;
  const { isLoaded, signUp, setActive } = useSignUp();

  const [isProcessingSignUp, setIsProcessingSignUp] = useState(false);

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

    setIsProcessingSignUp(true);

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
    } finally {
      setIsProcessingSignUp(false);
    }
  }

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    setIsProcessingSignUp(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      router.replace("/home");
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsProcessingSignUp(false);
    }
  };

  return (
    <View className="mb-4">
      {!pendingVerification ? (
        <View className="flex flex-col items-center">
          <LoginInputField
            autoCapitalize="none"
            label="Email"
            value={emailAddress}
            placeholder="name@example.com"
            onChangeText={(newEmailAddress) =>
              dispatchLoginInput({ emailAddress: newEmailAddress })
            }
          />

          <LoginInputField
            autoCapitalize="none"
            value={username}
            placeholder="user_name"
            label="Username"
            onChangeText={(newUsername) =>
              dispatchLoginInput({ username: newUsername })
            }
          />

          <LoginInputField
            value={password}
            label="Password"
            placeholder="********"
            secureTextEntry={true}
            onChangeText={(newPassword) =>
              dispatchLoginInput({ password: newPassword })
            }
          />

          <StyledButton
            colorful
            buttonStyle="w-full"
            onPress={() => void onSignUpPress()}
            disabled={isProcessingSignUp}
            text={isProcessingSignUp ? "Loading..." : "Create Account"}
          />
        </View>
      ) : (
        <View className="flex flex-col items-center">
          <LoginInputField
            label="Code"
            value={code}
            placeholder="123456"
            onChangeText={setCode}
          />
          <StyledButton
            buttonStyle="w-full"
            colorful
            onPress={() => void onPressVerify()}
            disabled={isProcessingSignUp}
            text={isProcessingSignUp ? "Loading..." : "Verify Email"}
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
