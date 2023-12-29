import React from "react";
import { Switch, View } from "react-native";
import { Image } from "expo-image";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { blurhash } from "~/utils/blur-hash";
import { StyledButton } from "~/components/button";
import { ThemeableText } from "~/components/themeable/themable-text";
import { ThemeableView } from "~/components/themeable/themable-view";
import { UsernameEdit } from "~/components/username-edit/username-edit";

export default function ProfileScreen() {
  const { user } = useUser();
  const auth = useAuth();

  return (
    <ThemeableView className="flex h-full w-full flex-col items-center">
      {user?.imageUrl ? (
        <Image
          alt="Profile Image"
          className="m-8 mb-2 aspect-square w-1/5 rounded-full "
          source={user?.imageUrl}
          placeholder={blurhash}
          contentFit="cover"
        />
      ) : null}
      {user?.username ? (
        <ThemeableText className="text-2xl font-bold">
          {user?.username}
        </ThemeableText>
      ) : null}
      <ThemeableText>{user?.primaryEmailAddress?.emailAddress}</ThemeableText>
    </ThemeableView>
  );
}
