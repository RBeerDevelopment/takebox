import React from "react";
import { TouchableOpacity } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import Material from "@expo/vector-icons/MaterialIcons";

interface Props {
  text: string;
  iconFont?: "fontisto" | "material";
  onPress?: () => void;
  iconName?: string;
}

export function IconButton(props: Props): React.ReactElement {
  const { text, iconName, onPress, iconFont = "fontisto" } = props;

  const IconComponent = iconFont === "fontisto" ? Fontisto : Material;
  return (
    <TouchableOpacity className="my-2 flex w-full" onPress={onPress}>
      <IconComponent.Button
        onPress={onPress}
        backgroundColor="white"
        color="black"
        className="flex h-10 w-full justify-center"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        name={iconName as any}
      >
        {text}
      </IconComponent.Button>
    </TouchableOpacity>
  );
}
