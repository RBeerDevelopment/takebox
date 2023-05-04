import React from "react";
import { View, Text } from "react-native";

interface Props {
  text?: string;
}

export function ErrorMessage(props: Props): React.ReactElement {
  const { text = "Es ist ein Fehler aufgetreten." } = props;
  return (
    <View className="h-3/4 w-full items-center justify-center">
      <Text className="text-md italic text-red-800">{text}</Text>
    </View>
  );
}
