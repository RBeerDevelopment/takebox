import React from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  isOpen: boolean;
}

export function OpenClosedRow(props: Props): React.ReactElement {
  const { isOpen } = props;

  const text = isOpen ? (
    <Text className="font-semibold text-green-700 dark:text-green-500">
      Open
    </Text>
  ) : (
    <Text className="font-semibold text-red-800 dark:text-red-500">Closed</Text>
  );

  const iconName = isOpen ? "check-circle" : "cancel";
  const iconColor = isOpen ? "green" : "red";

  return (
    <View className="my-4 flex w-11/12 flex-row items-center gap-2">
      <MaterialIcons name={iconName} size={28} color={iconColor} />
      {text}
    </View>
  );
}
