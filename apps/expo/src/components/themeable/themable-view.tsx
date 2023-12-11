import React from "react";
import { TouchableOpacity, View } from "react-native";

import { cn } from "~/utils";

type Props = {
  className?: string;
  onPress?: () => void;
} & View["props"];

export function ThemeableView(props: Props): React.ReactElement {
  const { children, className = "", onPress, ...rest } = props;

  const classes = cn("bg-background", className);

  if (onPress) {
    return (
      <TouchableOpacity className={classes} onPress={onPress} {...rest}>
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <View className={classes} {...rest}>
      {children}
    </View>
  );
}
