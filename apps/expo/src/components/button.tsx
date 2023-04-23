import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  text: string;
  onPress: () => void;
}

export function StyledButton(props: Props): React.ReactElement {
  const { text, onPress } = props;
  return (
    <TouchableOpacity
      className="my-2 flex w-full items-center justify-center rounded-lg bg-white py-2"
      onPress={onPress}
    >
      <Text className="text-lg capitalize text-black">{text}</Text>
    </TouchableOpacity>
  );
}
