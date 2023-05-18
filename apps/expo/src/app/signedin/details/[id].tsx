import React from "react";

import { Text, View } from "react-native";
import { Image } from "expo-image";
import { useSearchParams, Stack } from "expo-router";
import { LoadingIndicator } from "../../../components/loading-indicator";
import { ErrorMessage } from "../../../components/error-message";
import { trpc } from "../../../utils/trpc";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function DetailScreen() {
  const { id } = useSearchParams();

  const {
    data: restaurant,
    isFetching,
    isError,
  } = trpc.restaurant.getRestaurantDetails.useQuery(
    { placeId: id as string },
    { enabled: Boolean(id), staleTime: 60 * 1000 },
  );

  const { data: imageUrl } = trpc.restaurant.getImageUrl.useQuery(
    { placeId: id as string },
    { enabled: Boolean(id), staleTime: Infinity },
  );

  if (isFetching) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorMessage text="Error while loading, try again." />;
  }

  return (
    <View className="flex h-full w-full flex-col items-center">
      <Stack.Screen options={{ title: restaurant?.name }} />

      <Image
        className="m-4 h-1/4 w-11/12 rounded-xl"
        source={imageUrl}
        placeholder={blurhash}
        contentFit="cover"
      />
      <Text>Test</Text>
    </View>
  );
}
