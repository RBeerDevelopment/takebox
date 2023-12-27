import React from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { api } from "~/utils/api";
import { useRefreshOnFocus } from "~/hooks/use-refetch-on-focus";
import { useLocationStore } from "~/state";
import { SearchResultsSkeleton } from "../skeleton";
import { ThemeableText } from "../themeable/themable-text";
import { ThemeableView } from "../themeable/themable-view";
import { ReviewSummary } from "./review-summary";

export function LatestReviewSection(): React.ReactElement {
  const coords = useLocationStore((state) => state.location?.coords);
  const {
    data: reviews,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = api.review.latestReviews.useQuery(
    { lat: coords?.latitude ?? 0, lng: coords?.longitude ?? 0 },
    { enabled: Boolean(coords) },
  );

  if (isLoading) return <SearchResultsSkeleton />;

  if (isError || reviews.length === 0)
    return (
      <View className="flex h-full w-full items-center pt-10">
        <ThemeableText className="italic">No nearby reviews.</ThemeableText>
      </View>
    );

  return (
    <ThemeableView className="flex h-[78vh] w-full flex-col p-4">
      <ThemeableText className="pb-2 font-bold">Latest Reviews</ThemeableText>
      <FlashList
        data={reviews}
        renderItem={({ item }) => <ReviewSummary review={item} />}
        estimatedItemSize={280}
        onRefresh={() => void refetch()}
        refreshing={isRefetching}
      />
    </ThemeableView>
  );
}
