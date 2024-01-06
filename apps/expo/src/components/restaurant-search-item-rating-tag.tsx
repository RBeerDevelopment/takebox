import React from "react";
import { View } from "react-native";

import { colors } from "~/utils/colors";
import { IconComponent } from "./icon-button/icon-component";
import { ThemeableText } from "./themeable/themable-text";

interface Props {
  rating: number | null;
}

export function RestaurantSearchItemRatingTag(props: Props) {
  const { rating } = props;

  if (!rating) return null;
  return (
    <View className="flex flex-row items-center rounded-full bg-white px-1.5 py-1">
      <IconComponent iconSize={16} iconName="star" iconColor={colors.primary} />
      <ThemeableText className="text-primary text-sm font-bold">
        {parseFloat(String(rating)).toFixed(1)}
      </ThemeableText>
    </View>
  );
}
