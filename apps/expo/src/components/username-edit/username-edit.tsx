import React from "react";
import { TextInput, View } from "react-native";
import { useUser } from "@clerk/clerk-expo";

import { api } from "~/utils/api";
import { IconOnlyButton } from "../icon-button";
import { ThemeableText } from "../themeable/themable-text";

interface Props {
  startInEditMode?: boolean;
}

export function UsernameEdit(props: Props): React.ReactElement {
  const { startInEditMode = false } = props;

  const { user } = useUser();

  const [usernameEditMode, setUsernameEditMode] =
    React.useState(startInEditMode);
  const [username, setUsername] = React.useState(user?.username || "");
  const [error, setError] = React.useState<string>();

  const { mutate: upsertUser } = api.user.upsert.useMutation();

  async function onSaveUsername() {
    if (username.length <= 3) {
      setError("Username must be longer than 3 characters.");
      return;
    }
    try {
      await user?.update({ username });
      setUsernameEditMode(false);
      upsertUser({ username });
    } catch (err: unknown) {
      setError((err as { message: string }).message);
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
          Your username
        </ThemeableText>
      )}
      <IconOnlyButton
        iconFont="material"
        iconName="edit"
        iconColor="white"
        onPress={() => setUsernameEditMode(true)}
      />
    </>
  );

  if (usernameEditMode) {
    content = (
      <>
        <TextInput
          className="px-2 py-4 text-xl font-bold text-white"
          placeholderTextColor="#b1b1b1"
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
          style="px-1"
          iconColor="white"
          onPress={onCancel}
        />
        <IconOnlyButton
          iconFont="material"
          iconName="check"
          style="px-2"
          iconColor="white"
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
