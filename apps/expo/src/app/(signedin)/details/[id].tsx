import React from "react";

import { ScrollView, View } from "react-native";
import { Image } from "expo-image";
import { useSearchParams, Stack } from "expo-router";
import { LoadingIndicator } from "../../../components/loading-indicator";
import { ErrorMessage } from "../../../components/error-message";
import { trpc } from "../../../utils/trpc";
import { useWarmUpBrowser } from "../../../hooks/useWarmUpBrowser";
import { DetailSection } from "../../../components/detail-section";
import { DetailReviewSection } from "../../../components/detail-review-section";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function DetailScreen() {
  const { id } = useSearchParams();

  useWarmUpBrowser();

  const [restaurantResult, imageResult, reviewResult] = trpc.useQueries((t) => [
    t.restaurant.getRestaurantDetails(
      { placeId: id as string },
      { enabled: Boolean(id), staleTime: 60 * 1000 },
    ),
    t.restaurant.getImageUrl(
      { placeId: id as string },
      { enabled: Boolean(id), staleTime: Infinity },
    ),
    t.review.reviewSummary(
      {
        placeId: id as string,
      },
      { enabled: Boolean(id), staleTime: Infinity },
    ),
  ]);

  if (restaurantResult.isLoading) {
    return <LoadingIndicator />;
  }

  if (restaurantResult.isError) {
    return <ErrorMessage text="Error while loading, try again." />;
  }

  const restaurant = restaurantResult.data;

  const reviews = reviewResult.data;

  return (
    <ScrollView className="flex h-full w-full flex-col">
      <Stack.Screen options={{ title: restaurant?.name }} />

      <View className="my-4 flex h-44 w-full items-center rounded-xl">
        <Image
          className="h-full w-11/12 rounded-xl"
          source={imageResult.data}
          placeholder={blurhash}
          contentFit="cover"
        />
      </View>
      <DetailSection restaurant={restaurant} />
      <DetailReviewSection
        restaurantId={Array.isArray(id) ? id[0] : id}
        avgRating={reviews?._avg.rating}
        ratingCount={reviews?._count.rating}
      />
    </ScrollView>
  );
}
