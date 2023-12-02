import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

import { ThemeableText } from "./themeable/themable-text";

interface Props {
  name: string;
  id: string;
  address: string;
  distance: number;
}

export function RestaurantSearchItem(props: Props): React.ReactElement {
  const { id, name, address, distance } = props;

  const router = useRouter();

  return (
    <TouchableOpacity
      className="flex w-full flex-col px-4 py-2"
      onPress={() => router.push(`/restaurant/${id}`)}
    >
      <ThemeableText className="text-lg font-bold dark:text-white">
        {name}
      </ThemeableText>
      <ThemeableText className="text-md dark:text-white">
        {address}
      </ThemeableText>
      <ThemeableText className="text-sm italic text-gray-500">
        {distance}m
      </ThemeableText>
    </TouchableOpacity>
  );
}
