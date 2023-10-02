import React from "react";
import { View } from "react-native";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { api } from "~/utils/api";
import { useRefreshOnFocus } from "~/hooks/use-refetch-on-focus";
import { Skeleton } from "../skeleton/skeleton";
import { ThemeableText } from "../themeable/themable-text";
import { ThemeableView } from "../themeable/themable-view";
import { ReviewSummary } from "./review-summary";

export function LatestReviewSection(): React.ReactElement {
  const {
    data: reviews,
    isLoading,
    isError,
    refetch,
  } = api.review.latestReviews.useQuery({ take: 10 }, { staleTime: 1 });

  useRefreshOnFocus(refetch);

  if (isLoading) return <Skeleton />;

  if (isError || reviews.length === 0)
    return (
      <View className="flex h-full w-full items-center pt-10">
        <ThemeableText className="italic">No reviews found.</ThemeableText>
      </View>
    );

  return (
    <ThemeableView className="flex h-[78vh] w-full flex-col p-4">
      <ThemeableText className="pb-2 font-bold dark:text-white">
        Latest Reviews
      </ThemeableText>
      <FlashList
        data={reviews}
        renderItem={({ item }) => (
          <Link
            className="w-full"
            href={`/details/${item.restaurant.googleId}`}
          >
            <ReviewSummary review={item} />
          </Link>
        )}
        estimatedItemSize={280}
      />
    </ThemeableView>
  );
}
