import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
  className?: string;
}
export function CustomSafeAreaProvider({ children, className = "" }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className={className}
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
