import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useDarkMode } from "~/hooks/use-dark-mode";

interface Props {
  children: React.ReactNode;
  isColorfulBackground?: boolean;
}
export function CustomSafeAreaProvider({
  children,
  isColorfulBackground,
}: Props) {
  const insets = useSafeAreaInsets();

  const isDarkMode = useDarkMode();

  return (
    <View
      className={
        isColorfulBackground
          ? "bg-primary"
          : isDarkMode
          ? "bg-white"
          : "bg-slate-950"
      }
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        flex: 1,
      }}
    >
      {children}
    </View>
  );
}
