import React from "react";
import { Link } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { api } from "~/utils/api";
import { Skeleton } from "../skeleton/skeleton";
import { ThemeableText } from "../themeable/themable-text";
import { ThemeableView } from "../themeable/themable-view";
import { ReviewSummary } from "./review-summary";

export function LatestReviewSection(): React.ReactElement {
  const {
    data: reviews,
    isLoading,
    isError,
  } = api.review.latestReviews.useQuery({ take: 10 }, { refetchOnMount: true });

  if (isLoading) return <Skeleton />;

  if (isError || reviews.length === 0) return <></>;
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
