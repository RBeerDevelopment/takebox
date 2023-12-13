import React from "react";
import { View } from "react-native";

import { ThemeableText } from "./themeable/themable-text";

interface Props {
  text?: string;
}

export function ErrorMessage(props: Props): React.ReactElement {
  const { text = "An error occured." } = props;
  return (
    <View className="h-3/4 w-full items-center justify-center px-6">
      <ThemeableText className="text-md italic text-red-500">
        {text}
      </ThemeableText>
    </View>
  );
}
