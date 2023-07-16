import React from "react";
import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { api } from "~/utils/api";
import { Skeleton } from "../skeleton/skeleton";
import { LatestReviewSummary } from "./latest-review-summary";

export function LatestReviewSection(): React.ReactElement {
  const {
    data: reviews,
    isLoading,
    isError,
  } = api.review.latestReviews.useQuery({ take: 10 });

  if (isLoading) return <Skeleton />;

  if (isError || reviews.length === 0) return <></>;
  return (
    <View className="flex h-5/6 w-full flex-col p-4">
      <Text className="pb-2 font-bold">Latest Reviews</Text>
      <FlashList
        data={reviews}
        renderItem={({ item }) => <LatestReviewSummary review={item} />}
        estimatedItemSize={280}
      />
    </View>
  );
}
