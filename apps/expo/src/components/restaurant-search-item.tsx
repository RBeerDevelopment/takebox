import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

import { type RestaurantSearchResult } from "@flavoury/api/src/functions/restaurant/get-nearby-restaurants-by-query";

import { RestaurantSearchItemRatingTag } from "./restaurant-search-item-rating-tag";
import { ThemeableText } from "./themeable/themable-text";

export function RestaurantSearchItem(
  props: RestaurantSearchResult,
): React.ReactElement {
  const { id, name, address, distance, rating } = props;

  const router = useRouter();

  return (
    <TouchableOpacity
      className="flex w-full flex-row items-center justify-between px-4 py-2"
      onPress={() => router.push(`/restaurant/${id}`)}
    >
      <View className="flex flex-col">
        <ThemeableText className="mr-2 text-base font-bold">
          {name}
        </ThemeableText>

        <ThemeableText className="text-md">{address}</ThemeableText>
        <ThemeableText className="text-sm italic text-gray-500">
          {distance}m
        </ThemeableText>
      </View>
      <RestaurantSearchItemRatingTag rating={rating} />
    </TouchableOpacity>
  );
}
