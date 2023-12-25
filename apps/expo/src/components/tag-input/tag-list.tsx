import React from "react";
import { View } from "react-native";

import { usePrimaryColor } from "~/hooks/use-primary-color";
import { IconOnlyButton } from "../icon-button";
import { ThemeableText } from "../themeable/themable-text";

interface Props {
  tags: string[];
  onDelete?: (index: number) => void;
}

export function TagList(props: Props): React.ReactElement {
  const { tags, onDelete } = props;

  const primaryColor = usePrimaryColor();

  return (
    <View className="flex w-full flex-row flex-wrap overflow-x-hidden">
      {tags.map((tag, index) => (
        <View
          key={index}
          style={{ backgroundColor: primaryColor }}
          className="mx-2 my-2 flex w-fit flex-row items-center justify-center rounded-full px-2 py-1"
        >
          <ThemeableText className="text-black">{tag}</ThemeableText>
          {onDelete !== undefined ? (
            <IconOnlyButton
              iconName="clear"
              iconFont="material"
              style="pl-1"
              iconColor="black"
              onPress={() => onDelete(index)}
            />
          ) : null}
        </View>
      ))}
    </View>
  );
}
