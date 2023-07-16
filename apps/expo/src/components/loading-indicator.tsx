import { ActivityIndicator } from "react-native";

import { ThemeableView } from "./themeable/themable-view";

export function LoadingIndicator() {
  return (
    <ThemeableView className="mb-20 h-full w-full items-center justify-center">
      <ActivityIndicator />
    </ThemeableView>
  );
}
