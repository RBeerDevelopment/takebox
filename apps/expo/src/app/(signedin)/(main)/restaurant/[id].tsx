import React from "react";
import { ScrollView, View } from "react-native";
import { Image } from "expo-image";
import { Stack, useGlobalSearchParams } from "expo-router";

import { api } from "~/utils/api";
import { blurhash } from "~/utils/blur-hash";
import { shareRestaurant } from "~/utils/share-restaurant";
import { DetailReviewSection } from "~/components/detail-review-section";
import { DetailSection } from "~/components/detail-section";
import { ErrorMessage } from "~/components/error-message";
import { IconOnlyButton } from "~/components/icon-button";
import { LoadingIndicator } from "~/components/loading-indicator";
import { PersonalNotesSection } from "~/components/personal-notes/personal-notes-section";
import { ThemeableView } from "~/components/themeable/themable-view";
import { useWarmUpBrowser } from "~/hooks/useWarmUpBrowser";

export default function DetailScreen() {
  const { id } = useGlobalSearchParams();

  useWarmUpBrowser();
  const [restaurantResult, imageResult] = api.useQueries((t) => [
    t.restaurant.getRestaurantDetails(
      { placeId: id as string },
      {
        enabled: Boolean(id),
        staleTime: 60 * 1000,
        refetchOnMount: false,
      },
    ),
    t.restaurant.getImageUrl(
      { placeId: id as string },
      { enabled: Boolean(id), staleTime: Infinity, refetchOnMount: false },
    ),
  ]);

  if (restaurantResult.isLoading) {
    return <LoadingIndicator />;
  }

  if (restaurantResult.isError) {
    return (
      <ThemeableView>
        <ErrorMessage text="Error while loading, try again." />
      </ThemeableView>
    );
  }

  const restaurant = restaurantResult.data;

  return (
    <ScrollView className="flex h-full w-full flex-col bg-slate-950">
      <Stack.Screen
        options={{
          title: restaurant?.name,
          headerRight: () => (
            <IconOnlyButton
              onPress={() => void shareRestaurant(id as string)}
              iconName="ios-share"
              style="p-2"
              iconFont="material"
              iconColor="white"
            />
          ),
        }}
      />

      <View className="my-4 flex h-44 w-full items-center rounded-xl">
        <Image
          alt="Restaurant Image"
          className="h-full w-11/12 rounded-xl"
          source={imageResult.data}
          placeholder={blurhash}
          contentFit="cover"
        />
      </View>
      <DetailReviewSection restaurantId={Array.isArray(id) ? id[0] : id} />
      <PersonalNotesSection restaurantId={Array.isArray(id) ? id[0] : id} />
      <DetailSection restaurant={restaurant} />
    </ScrollView>
  );
}
