import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

import { type RestaurantSearchResult } from "@flavoury/api/src/functions/restaurant/get-nearby-restaurants-by-query";

import { colors } from "~/utils/colors";
import { IconComponent } from "./icon-button/icon-component";
import { ThemeableText } from "./themeable/themable-text";

export function RestaurantSearchItem(
  props: RestaurantSearchResult,
): React.ReactElement {
  const { id, name, address, distance, rating } = props;

  const router = useRouter();

  return (
    <TouchableOpacity
      className="flex w-full flex-col px-4 py-2"
      onPress={() => router.push(`/restaurant/${id}`)}
    >
      <View className="flex flex-row items-center space-x-2">
        <ThemeableText className="text-base font-bold">{name}</ThemeableText>
        {rating !== null && rating !== undefined ? (
          <View className="flex flex-row items-center">
            <IconComponent
              className="h-2 w-2"
              iconSize={20}
              iconName="star"
              iconColor={colors.primary}
            />
            <ThemeableText className="text-primary text-lg font-semibold">
              {parseFloat(String(rating)).toFixed(1)}
            </ThemeableText>
          </View>
        ) : null}
      </View>
      <ThemeableText className="text-md">{address}</ThemeableText>
      <ThemeableText className="text-sm italic text-gray-500">
        {distance}m
      </ThemeableText>
    </TouchableOpacity>
  );
}
