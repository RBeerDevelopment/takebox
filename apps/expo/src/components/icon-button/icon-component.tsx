import React from "react";
import Fontisto from "@expo/vector-icons/Fontisto";
import Material from "@expo/vector-icons/MaterialIcons";

interface Props {
  iconFont?: "fontisto" | "material";
  iconName: string;
  className?: string;
  iconColor?: string;
}

export function IconComponent(props: Props): React.ReactElement {
  const {
    iconName,
    iconFont = "fontisto",
    className = "",
    iconColor = "black",
  } = props;

  const IconComponent = iconFont === "fontisto" ? Fontisto : Material;

  return (
    <IconComponent
      className={className}
      size={24}
      color={iconColor}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      name={iconName as any}
    />
  );
}
