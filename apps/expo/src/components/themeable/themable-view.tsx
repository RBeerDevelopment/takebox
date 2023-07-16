import React from "react";
import { View } from "react-native";

import { cn } from "~/utils";

type Props = {
  className?: string;
} & View["props"];

export function ThemeableView(props: Props): React.ReactElement {
  const { children, className = "", ...rest } = props;

  const classes = cn("bg-white dark:bg-slate-950", className);

  return (
    <View className={classes} {...rest}>
      {children}
    </View>
  );
}
