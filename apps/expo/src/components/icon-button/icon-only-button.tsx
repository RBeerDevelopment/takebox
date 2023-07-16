import React from "react";
import { TouchableOpacity } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import Material from "@expo/vector-icons/MaterialIcons";

interface Props {
  iconFont?: "fontisto" | "material";
  onPress: () => void;
  iconName: string;
  className?: string;
}

export function IconOnlyButton(props: Props): React.ReactElement {
  const { iconName, onPress, iconFont = "fontisto", className = "" } = props;

  const IconComponent = iconFont === "fontisto" ? Fontisto : Material;

  return (
    <TouchableOpacity onPress={onPress}>
      <IconComponent
        className={className}
        onPress={onPress}
        color="black"
        size={24}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        name={iconName as any}
      />
    </TouchableOpacity>
  );
}
