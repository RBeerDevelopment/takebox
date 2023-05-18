import React from "react";

import { ScrollView, View } from "react-native";
import { Image } from "expo-image";
import { useSearchParams, Stack } from "expo-router";
import { LoadingIndicator } from "../../../components/loading-indicator";
import { ErrorMessage } from "../../../components/error-message";
import { trpc } from "../../../utils/trpc";
import { DetailRow } from "../../../components/detail-row";
import { OpenClosedRow } from "../../../components/open-closed-row";

import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../../hooks/useWarmUpBrowser";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function DetailScreen() {
  const { id } = useSearchParams();

  useWarmUpBrowser();

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

  console.log(restaurant?.website);
  console.log(restaurant?.url);
  return (
    <ScrollView className="flex h-full w-full flex-col">
      <Stack.Screen options={{ title: restaurant?.name }} />

      <View className="my-4 flex h-44 w-full items-center rounded-xl">
        <Image
          className="h-full w-11/12 rounded-xl"
          source={imageUrl}
          placeholder={blurhash}
          contentFit="cover"
        />
      </View>
      <View className="mx-6 flex flex-col">
        <DetailRow
          iconName="map"
          text={restaurant?.formatted_address}
          allowCopy
        />
        <OpenClosedRow
          isOpen={Boolean(restaurant?.current_opening_hours?.open_now)}
        />
        {restaurant?.url && (
          <DetailRow
            iconName="google-maps"
            text="Google Maps"
            onPress={() => WebBrowser.openBrowserAsync(restaurant?.url || "")}
          />
        )}

        {restaurant?.website && (
          <DetailRow
            iconName="web"
            text="Website"
            onPress={() =>
              WebBrowser.openBrowserAsync(restaurant?.website || "")
            }
          />
        )}
      </View>
    </ScrollView>
  );
}
