import React from "react";

import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-[#2e026d] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <View className="h-full w-full items-center justify-center">
        <Text className="text-lg italic text-white">
          Nothing to see here yet...
        </Text>
      </View>
    </SafeAreaView>
  );
};
