import React from "react";
import { Image } from "expo-image";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { blurhash } from "~/utils/blur-hash";
import { StyledButton } from "~/components/button";
import { ThemeableText } from "~/components/themeable/themable-text";
import { ThemeableView } from "~/components/themeable/themable-view";
import { UsernameEdit } from "~/components/username-edit/username-edit";

export default function ProfileModal(): React.ReactElement {
  const { user } = useUser();
  const auth = useAuth();

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
      <StyledButton
        buttonStyle="w-1/2 absolute bottom-16"
        text="Log Out"
        onPress={() => void auth.signOut()}
        colorful
      />
    </ThemeableView>
  );
}
