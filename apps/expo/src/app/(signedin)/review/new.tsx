import { useNavigation } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function ReviewScreen(): React.ReactElement {
  const navigation = useNavigation();

  return (
    <View className="h-full w-full">
      <Text onPress={() => navigation.goBack}>Test</Text>
    </View>
  );
}
