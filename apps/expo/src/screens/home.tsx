import React from "react";

import { Text, View } from "react-native";
import { Layout } from "../components/layout";

export function HomeScreen() {
  return (
    <Layout>
      <View className="h-full w-full items-center justify-center">
        <Text className="text-lg italic text-white">
          Nothing to see here yet...
        </Text>
      </View>
    </Layout>
  );
}
