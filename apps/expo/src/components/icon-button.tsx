import React from "react";
import { TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/Fontisto";

interface Props {
  text: string;
  iconName: string;
  onPress: () => void;
}

export function IconButton(props: Props): React.ReactElement {
  const { text, iconName, onPress } = props;
  return (
    <TouchableOpacity className="my-2 flex w-full" onPress={onPress}>
      <FontAwesome.Button
        onPress={onPress}
        backgroundColor="white"
        color="black"
        className="flex h-10 w-full justify-center"
        name={iconName as any}
      >
        {text}
      </FontAwesome.Button>
    </TouchableOpacity>
  );
}
