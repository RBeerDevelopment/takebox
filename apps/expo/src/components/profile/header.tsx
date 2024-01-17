import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { useUser } from "@clerk/clerk-expo";

import { blurhash } from "~/utils/blur-hash";
import { ThemeableText } from "../themeable/themable-text";

export function ProfileHeader(): React.ReactElement {
  const { user } = useUser();
  return (
    <View className="flex flex-col items-center pb-3">
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
    </View>
  );
}
