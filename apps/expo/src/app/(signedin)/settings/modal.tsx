import React from "react";
import { Switch, View } from "react-native";
import { Image } from "expo-image";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { blurhash } from "~/utils/blur-hash";
import { colors } from "~/utils/colors";
import { StyledButton } from "~/components/button";
import { ThemeableText } from "~/components/themeable/themable-text";
import { ThemeableView } from "~/components/themeable/themable-view";
import { UsernameEdit } from "~/components/username-edit/username-edit";
import { usePersistedStore } from "~/state/persisted";

export default function ProfileModal(): React.ReactElement {
  const { user } = useUser();
  const auth = useAuth();

  const [isDeveloperMode, setIsDeveloperMode] = usePersistedStore((state) => [
    state.isDeveloperMode,
    state.setIsDeveloperMode,
  ]);

  return (
    <ThemeableView className="flex h-full w-full flex-col items-center p-2">
      {user?.imageUrl ? (
        <Image
          alt="Profile Image"
          className="m-8 mb-2 aspect-square w-1/3 rounded-full "
          source={user?.imageUrl}
          placeholder={blurhash}
          contentFit="cover"
        />
      ) : null}
      <UsernameEdit />
      <ThemeableText>{user?.primaryEmailAddress?.emailAddress}</ThemeableText>

      <View className="flex w-full flex-row items-center justify-between px-4 pt-20">
        <ThemeableText>Enable Developer Mode</ThemeableText>
        <Switch
          trackColor={{ false: "#767577", true: colors.primary }}
          thumbColor="#f4f3f4"
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) => setIsDeveloperMode(value)}
          value={isDeveloperMode}
        />
      </View>

      <StyledButton
        buttonStyle="w-1/2 absolute bottom-16"
        text="Log Out"
        onPress={() => void auth.signOut()}
        colorful
      />
    </ThemeableView>
  );
}
