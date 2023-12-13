import React from "react";
import { Text } from "react-native";

import { cn } from "~/utils";

type Props = {
  className?: string;
} & Text["props"];

export function ThemeableText(props: Props): React.ReactElement {
  const { children, className = "", ...rest } = props;

  const classes = cn("text-white", className);

  return (
    <Text className={classes} {...rest}>
      {children}
    </Text>
  );
}
