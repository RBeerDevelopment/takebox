import React from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Image } from "expo-image";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { blurhash } from "~/utils/blur-hash";
import { StyledButton } from "~/components/button";
import { ThemeableText } from "~/components/themeable/themable-text";
import { ThemeableView } from "~/components/themeable/themable-view";
import { ThemeableSwitch } from "~/components/themeable/themeable-switch";
import { UsernameEdit } from "~/components/username-edit/username-edit";
import { usePersistedStore } from "~/state/persisted";

export default function UsernameSetupModal(): React.ReactElement {
  const [isDeveloperMode, setIsDeveloperMode] = usePersistedStore((state) => [
    state.isDeveloperMode,
    state.setIsDeveloperMode,
  ]);
  const auth = useAuth();
  const { user } = useUser();
  return (
    <TouchableWithoutFeedback
      className="h-full w-full"
      onPress={Keyboard.dismiss}
    >
      <ThemeableView className="flex h-full w-full flex-col items-center space-y-4 py-10">
        {user?.imageUrl ? (
          <Image
            alt="Profile Image"
            className="mb-2 aspect-square w-1/5 rounded-full "
            source={user?.imageUrl}
            placeholder={blurhash}
            contentFit="cover"
          />
        ) : null}
        <UsernameEdit />
        <View className="flex w-full flex-row items-center justify-between px-4 py-2">
          <ThemeableText>Enable Developer Mode</ThemeableText>
          <ThemeableSwitch
            setValue={setIsDeveloperMode}
            value={isDeveloperMode}
          />
        </View>

        <StyledButton
          buttonStyle="w-1/2 mt-auto"
          text="Log Out"
          onPress={() => void auth.signOut()}
          colorful
        />
      </ThemeableView>
    </TouchableWithoutFeedback>
  );
}
