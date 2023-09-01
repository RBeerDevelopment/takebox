import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

import { StyledButton } from "~/components/button";
import { ThemeableText } from "~/components/themeable/themable-text";
import { ThemeableView } from "~/components/themeable/themable-view";
import { UsernameEdit } from "~/components/username-edit/username-edit";

export default function UsernameSetupModal(): React.ReactElement {
  const router = useRouter();
  const { user } = useUser();

  return (
    <TouchableWithoutFeedback
      className="h-full w-full"
      onPress={Keyboard.dismiss}
    >
      <ThemeableView className="mb-20 flex h-full w-full flex-col justify-center p-6">
        <ThemeableText>
          You haven&apos;t setup your username yet. Please pick one now.
        </ThemeableText>
        <UsernameEdit />
        {user?.username && (
          <StyledButton
            colorful={true}
            text="Continue"
            onPress={() => {
              router.replace("/home");
            }}
          />
        )}
      </ThemeableView>
    </TouchableWithoutFeedback>
  );
}
