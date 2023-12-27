import React from "react";
import { TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import * as Clipboard from "expo-clipboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemeableText } from "./themeable/themable-text";

interface Props {
  iconName: string;
  text?: string | null;
  onPress?: () => void;
  allowCopy?: boolean;
}

export function DetailRow(props: Props): React.ReactElement {
  const { allowCopy, iconName, text, onPress } = props;

  return (
    <TouchableOpacity
      onLongPress={() => {
        if (!allowCopy) return;

        Clipboard.setStringAsync(text || "")
          .then(() => {
            Toast.show({
              type: "success",
              text1: "Copied to clipboard!",
              position: "bottom",
              visibilityTime: 1000,
            });
          })
          .catch(() => {
            Toast.show({
              type: "error",
              text1: "Error copying to clipboard",
              position: "bottom",
              visibilityTime: 1000,
            });
          });
      }}
      onPress={() => {
        if (!onPress) return;
        onPress();
      }}
    >
      <View className="my-4 flex w-11/12 flex-row items-center gap-2">
        <MaterialCommunityIcons
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          name={iconName as any}
          size={28}
          color="white"
        />
        <ThemeableText className="text-base">{text}</ThemeableText>
      </View>
    </TouchableOpacity>
  );
}
