import React from "react";

import { Text, View } from "react-native";
import { useSearchParams, Stack } from "expo-router";
import { LoadingIndicator } from "../../../components/loading-indicator";
import { ErrorMessage } from "../../../components/error-message";
import { FlashList } from "@shopify/flash-list";
import { trpc } from "../../../utils/trpc";

export default function DetailScreen() {
  const { id } = useSearchParams();

  const {
    data: restaurant,
    isFetching,
    isError,
  } = trpc.restaurant.getRestaurantDetails.useQuery(
    { placeId: id as string },
    { enabled: Boolean(id) },
  );

  if (isFetching) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorMessage text="Error while loading, try again." />;
  }

  return (
    <View className="h-full w-full">
      <Stack.Screen options={{ title: restaurant?.name }} />
    </View>
  );
}
