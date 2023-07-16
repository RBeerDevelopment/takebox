import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { useDarkMode } from "~/hooks/use-dark-mode";
import { cn } from "~/utils";

interface Props {
  text: string;
  onPress: () => void;
  colorful?: boolean;
  buttonStyle?: string;
  textStyle?: string;
}

export function StyledButton(props: Props): React.ReactElement {
  const {
    text,
    onPress,
    buttonStyle = "",
    textStyle = "",
    colorful = false,
  } = props;

  const isDarkMode = useDarkMode();

  return (
    <TouchableOpacity
      className={cn(
        `my-2 flex w-full items-center justify-center rounded-lg ${
          colorful
            ? isDarkMode
              ? "bg-primary-dark"
              : "bg-primary"
            : "bg-transparent"
        } py-2`,
        buttonStyle,
      )}
      onPress={onPress}
    >
      <Text
        className={cn(
          `text-lg capitalize ${
            colorful ? "text-white" : isDarkMode ? "text-white" : "text-black"
          }`,
          textStyle,
        )}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
