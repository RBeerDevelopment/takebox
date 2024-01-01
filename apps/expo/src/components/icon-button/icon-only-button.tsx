import React from "react";
import { TouchableOpacity } from "react-native";

import { IconComponent } from "./icon-component";

interface Props {
  iconFont?: "fontisto" | "material";
  onPress: () => void;
  iconName: string;
  className?: string;
  iconColor?: string;
}

export function IconOnlyButton(props: Props): React.ReactElement {
  const {
    iconName,
    onPress,
    iconFont = "material",
    className = "",
    iconColor = "white",
  } = props;

  return (
    <TouchableOpacity onPress={onPress} className={className}>
      <IconComponent
        iconName={iconName}
        iconFont={iconFont}
        iconColor={iconColor}
      />
    </TouchableOpacity>
  );
}
