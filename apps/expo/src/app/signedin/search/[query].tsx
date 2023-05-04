import React from "react";

import { Text, View } from "react-native";
import { useSearchParams, Stack } from "expo-router";
import { useGeneralStore } from "../../../state";
import { trpc } from "../../../utils/trpc";
import { LoadingIndicator } from "../../../components/loading-indicator";
import { ErrorMessage } from "../../../components/error-message";
import { FlashList } from "@shopify/flash-list";

export default function HomeScreen() {
  const location = useGeneralStore((state) => state.location);

  const { query } = useSearchParams();

  const {
    data: restaurants,
    isFetching,
    isError,
  } = trpc.restaurant.nearbyRestaurantsByQuery.useQuery(
    {
      query: query as string,
      lat: 52.51247375561962,
      lng: 13.471466397574297,
    },
    {
      enabled:
        Boolean(query) &&
        query !== "" &&
        !!location?.coords?.latitude &&
        !!location?.coords?.longitude,
    },
  );

  if (isFetching) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorMessage text="Error while loading, try again." />;
  }

  return (
    <View className="h-full w-full bg-gray-50">
      <Stack.Screen options={{ title: "Search" }} />
      <FlashList
        data={restaurants}
        renderItem={({ item }) => (
          <View className="w-full flex-col p-4">
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-md">{item.address}</Text>
          </View>
        )}
        estimatedItemSize={280}
      />
    </View>
  );
}
