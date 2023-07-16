import React from "react";
import { TextInput, View } from "react-native";
import { useUser } from "@clerk/clerk-expo";

import { IconOnlyButton } from "../icon-button";
import { ThemeableText } from "../themeable/themable-text";

export function UsernameEdit(): React.ReactElement {
  const { user } = useUser();

  const [usernameEditMode, setUsernameEditMode] = React.useState(false);
  const [username, setUsername] = React.useState(user?.username || "");
  const [error, setError] = React.useState<string>();

  async function onSaveUsername() {
    try {
      await user?.update({ username });
      setUsernameEditMode(false);
    } catch (err: unknown) {
      setError("Username already taken.");
    }
  }

  function onCancel() {
    setUsername(user?.username || "");
    setUsernameEditMode(false);
    setError(undefined);
  }

  let content = (
    <>
      {user?.username ? (
        <ThemeableText className="px-2 py-4 text-xl font-bold">
          {user?.username}
        </ThemeableText>
      ) : (
        <ThemeableText className="px-2 py-4 text-xl italic text-gray-600">
          username
        </ThemeableText>
      )}
      <IconOnlyButton
        iconFont="material"
        iconName="edit"
        onPress={() => setUsernameEditMode(true)}
      />
    </>
  );

  if (usernameEditMode) {
    content = (
      <>
        <TextInput
          className="px-2 py-4 text-xl font-bold"
          placeholder="username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoFocus
          autoCorrect={false}
        />
        <IconOnlyButton
          iconFont="material"
          iconName="cancel"
          className="pr-1"
          onPress={onCancel}
        />
        <IconOnlyButton
          iconFont="material"
          iconName="check"
          className="px-2"
          onPress={() => void onSaveUsername()}
        />
      </>
    );
  }

  return (
    <>
      <View className="flex w-full flex-row items-center justify-center">
        {content}
      </View>
      {error ? (
        <ThemeableText className="pb-4 text-sm italic text-red-800">
          {error}
        </ThemeableText>
      ) : null}
    </>
  );
}
