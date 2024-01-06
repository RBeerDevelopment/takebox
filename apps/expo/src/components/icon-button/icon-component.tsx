import React from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import Material from "@expo/vector-icons/MaterialIcons";

interface Props {
  iconFont?: "fontisto" | "material";
  iconName: string;
  iconSize?: number;
  className?: string;
  iconColor?: string;
}

export function IconComponent(props: Props): React.ReactElement {
  const {
    iconName,
    iconFont = "material",
    className = "",
    iconColor = "black",
    iconSize = 24,
  } = props;

  const IconComponent = iconFont === "material" ? Material : Fontisto;

  return (
    <IconComponent
      className={className}
      size={iconSize}
      color={iconColor}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      name={iconName as any}
    />
  );
}
