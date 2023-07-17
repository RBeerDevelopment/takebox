import React from "react";
import { TouchableOpacity } from "react-native";

import { IconComponent } from "./icon-component";

interface Props {
  iconFont?: "fontisto" | "material";
  onPress: () => void;
  iconName: string;
  style?: string;
  iconColor?: string;
}

export function IconOnlyButton(props: Props): React.ReactElement {
  const { iconName, onPress, iconFont, style = "", iconColor } = props;

  return (
    <TouchableOpacity onPress={onPress} className={style}>
      <IconComponent
        iconName={iconName}
        iconFont={iconFont}
        iconColor={iconColor}
      />
    </TouchableOpacity>
  );
}
