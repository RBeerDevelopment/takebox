import React from "react";
import { TouchableOpacity, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { showErrorToast, showSuccessToast } from "~/utils/show-toast";
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
          .then(() => showSuccessToast("Copied to clipboard!"))
          .catch(() => showErrorToast("Error copying to clipboard."));
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
