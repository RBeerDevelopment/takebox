import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp, useUser } from "@clerk/clerk-expo";

import { ThemeableText } from "../themeable/themable-text";

export default function EmailSignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const user = useUser();

  console.log({ usersignedin: user.isSignedIn, user: user.user });

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    console.log("onPressVerify", isLoaded);
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      console.log("completeSignUp", completeSignUp);

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="mb-8">
      {!pendingVerification && (
        <View className="flex flex-col">
          <View>
            <LoginInputField
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>

          <View>
            <LoginInputField
              value={password}
              placeholder="Password..."
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity
            onPress={() => void onSignUpPress()}
            className="mx-auto w-40 items-center justify-center rounded-md bg-white p-4"
          >
            <ThemeableText>Sign up</ThemeableText>
          </TouchableOpacity>
        </View>
      )}
      {pendingVerification && (
        <View>
          <View>
            <LoginInputField
              value={code}
              placeholder="Code..."
              onChangeText={(code) => void setCode(code)}
            />
          </View>
          <TouchableOpacity
            className="mx-auto w-40 items-center justify-center rounded-md bg-white p-4"
            onPress={() => void onPressVerify()}
          >
            <ThemeableText>Verify Email</ThemeableText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

interface LoginInputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  [key: string]: unknown;
}
function LoginInputField(props: LoginInputFieldProps) {
  const { value, onChangeText, placeholder, ...rest } = props;

  return (
    <TextInput
      className="my-2 w-full rounded-lg bg-white px-4 py-4 text-black"
      value={value}
      placeholder={placeholder}
      placeholderTextColor="black"
      onChangeText={onChangeText}
      {...rest}
    />
  );
}
