import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";

interface Props {
  iconName: string;
  text?: string;
  onPress?: () => void;
  allowCopy?: boolean;
}

export function DetailRow(props: Props): React.ReactElement {
  const { allowCopy, iconName, text, onPress } = props;

  return (
    <TouchableOpacity
      onLongPress={() => {
        if (!allowCopy) return;

        Clipboard.setStringAsync(text || "");
        Toast.show({
          type: "success",
          text1: "Copied to clipboard!",
          position: "bottom",
          visibilityTime: 1000,
        });
      }}
      onPress={() => {
        if (!onPress) return;
        onPress();
      }}
    >
      <View className="my-4 flex w-11/12 flex-row items-center gap-2">
        <MaterialCommunityIcons
          name={iconName as any}
          size={28}
          color="black"
        />
        <Text className="text-base">{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
