import React from "react";
import { View } from "react-native";

import { IconOnlyButton } from "../icon-button";
import { ThemeableText } from "../themeable/themable-text";

interface Props {
  tags: string[];
  onDelete: (index: number) => void;
}

export function TagList(props: Props): React.ReactElement {
  const { tags, onDelete } = props;
  return (
    <View className="flex w-full flex-row flex-wrap overflow-x-hidden">
      {tags.map((tag, index) => (
        <View
          key={index}
          className="bg-primary-dark mx-2 my-2 flex w-fit flex-row items-center justify-center rounded-full px-2 py-1"
        >
          <ThemeableText>{tag}</ThemeableText>
          <IconOnlyButton
            iconName="cancel"
            iconFont="material"
            style="pl-1"
            onPress={() => onDelete(index)}
          />
        </View>
      ))}
    </View>
  );
}
