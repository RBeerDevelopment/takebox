import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/Fontisto";

interface Props {
  onPress: () => void;
}

export function SignInWithAppleButton(props: Props): React.ReactElement {
  const { onPress } = props;

  return (
    <TouchableOpacity className="flex h-14 w-full" onPress={onPress}>
      <View className="flex h-fit flex-row items-center justify-center rounded-full bg-white px-4 py-3">
        <View className="absolute left-6">
          <Icon size={28} name={"apple" as unknown as "key"} />
        </View>
        <Text className="text-lg font-bold">Sign in with Apple</Text>
      </View>
    </TouchableOpacity>
  );
}
