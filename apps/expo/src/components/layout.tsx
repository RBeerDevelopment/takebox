import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { appName } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  children: React.ReactNode;
}
export function Layout(props: Props): React.ReactElement {
  const { children } = props;

  return (
    <SafeAreaView className="bg-[#2e026d] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <View className="z-50 flex w-full flex-row items-center justify-between p-4 shadow-lg">
        <Text className="pl-4 text-2xl text-white">{appName}</Text>
        <TouchableOpacity className="rounded-full bg-white p-1">
          <MaterialIcons name="person" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="h-full w-full bg-white">{children}</View>
    </SafeAreaView>
  );
}
