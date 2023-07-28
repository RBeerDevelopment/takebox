import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { StyledButton } from "~/components/button";
import EmailSignUp from "~/components/email-login/email-signup";

enum LoginType {
  SignUp,
  SignIn,
}
export default function Email(): React.ReactElement {
  const router = useRouter();

  const [loginType, setLoginType] = useState(LoginType.SignUp);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let content = null;
  if (loginType === LoginType.SignUp) {
    content = (
      <SafeAreaView className="bg-primary">
        <View className="flex h-full flex-col bg-primary px-4">
          <Stack.Screen options={{ header: () => null }} />
          <EmailSignUp
            emailAddress={emailAddress}
            setEmailAddress={setEmailAddress}
            password={password}
            setPassword={setPassword}
            setError={setError}
          />
          {error.length > 0 ? (
            <Text className="w-full text-center text-lg italic text-white">
              {error}
            </Text>
          ) : null}
          <StyledButton onPress={() => void router.back()} text="Back" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary">
      <View className="flex h-full flex-col bg-primary px-4">
        <Stack.Screen options={{ header: () => null }} />
        {content}
      </View>
    </SafeAreaView>
  );
}
