import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  text: string;
  onPress: () => void;
  colorful?: boolean;
}

export function StyledButton(props: Props): React.ReactElement {
  const { text, onPress, colorful = false } = props;
  return (
    <TouchableOpacity
      className={`my-2 flex w-full items-center justify-center rounded-lg ${
        colorful ? "bg-primary" : "bg-white "
      } py-2`}
      onPress={onPress}
    >
      <Text
        className={`text-lg capitalize ${
          colorful ? "text-white" : "text-black"
        }`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
