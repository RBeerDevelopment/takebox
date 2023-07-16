import React from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { blurhash } from "~/utils/blur-hash";
import { StyledButton } from "~/components/button";
import { UsernameEdit } from "~/components/username-edit/username-edit";

export default function ProfileModal(): React.ReactElement {
  const { user } = useUser();
  const auth = useAuth();

  return (
    <View className="flex h-full w-full flex-col items-center p-2">
      {user?.profileImageUrl ? (
        <Image
          alt="Profile Image"
          className="m-8 mb-2 aspect-square w-1/3 rounded-full "
          source={user?.imageUrl}
          placeholder={blurhash}
          contentFit="cover"
        />
      ) : null}
      <UsernameEdit />

      <Text>{user?.primaryEmailAddress?.emailAddress}</Text>
      <StyledButton
        buttonStyle="w-1/2 absolute bottom-16"
        text="Log Out"
        onPress={() => void auth.signOut()}
        colorful
      />
    </View>
  );
}
