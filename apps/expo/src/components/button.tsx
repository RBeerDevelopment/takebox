import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { cn } from "~/utils";

interface Props {
  text: string;
  onPress: () => void;
  colorful?: boolean;
  buttonStyle?: string;
  textStyle?: string;
  disabled?: boolean;
}

export function StyledButton(props: Props): React.ReactElement {
  const {
    text,
    onPress,
    buttonStyle = "",
    textStyle = "",
    colorful = false,
    disabled = false,
  } = props;

  return (
    <TouchableOpacity
      className={cn(
        `my-2 flex w-full items-center justify-center rounded-lg ${
          disabled ? "bg-gray-500" : colorful ? "bg-primary" : "bg-transparent"
        } py-2`,
        buttonStyle,
      )}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        className={cn(
          "text-lg capitalize",
          colorful ? "text-black" : "text-white",
          textStyle,
        )}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
