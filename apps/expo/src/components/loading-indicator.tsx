import { ActivityIndicator, View } from "react-native";

export function LoadingIndicator() {
  return (
    <View className="h-3/4 w-full items-center justify-center">
      <ActivityIndicator />
    </View>
  );
}
