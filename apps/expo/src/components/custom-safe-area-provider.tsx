import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
}
export function CustomSafeAreaProvider({ children }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-slate-950"
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
