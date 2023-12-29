import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { useUser } from "@clerk/clerk-expo";

import { blurhash } from "~/utils/blur-hash";
import { OwnReviewsSection } from "~/components/review-summary/own-reviews-section";
import { ThemeableText } from "~/components/themeable/themable-text";
import { ThemeableView } from "~/components/themeable/themable-view";

export default function ProfileScreen() {
  const { user } = useUser();

  return (
    <ThemeableView className="flex h-full w-full flex-col items-center space-y-8">
      <View className="flex flex-col items-center">
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
      <OwnReviewsSection />
    </ThemeableView>
  );
}
