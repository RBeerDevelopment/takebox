import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";

import { api } from "~/utils/api";
import { StyledButton } from "./button";
import { ReviewGraph } from "./review-graph";
import { ReviewSummary } from "./review-summary/review-summary";
import { Skeleton } from "./skeleton/skeleton";
import { ThemeableText } from "./themeable/themable-text";

interface Props {
  restaurantId?: string;
}

export function DetailReviewSection(props: Props): React.ReactElement {
  const { restaurantId } = props;

  const router = useRouter();

  const [reviewSummaryQuery, latestReviewsQuery] = api.useQueries((t) => [
    t.review.reviewSummary(
      {
        placeId: restaurantId as string,
      },
      {
        enabled: Boolean(restaurantId),
        staleTime: Infinity,
        refetchOnMount: false,
      },
    ),
    t.review.latestReviewsForRestaurant(
      { restaurantId: restaurantId || "" },
      {
        enabled: Boolean(restaurantId),
        staleTime: Infinity,
        refetchOnMount: false,
      },
    ),
  ]);

  const isLoading =
    reviewSummaryQuery.isLoading || latestReviewsQuery.isLoading;
  const isError = reviewSummaryQuery.isError || latestReviewsQuery.isError;

  if (isLoading) {
    return (
      <View className="mx-6 flex flex-col">
        <Skeleton mods="h-6 my-2" />
        <Skeleton mods="h-6 my-2" />
        <Skeleton mods="h-6 my-2" />
      </View>
    );
  }

  if (isError || !reviewSummaryQuery.data || !latestReviewsQuery.data)
    return (
      <View className="mx-4 flex flex-col">
        <ThemeableText className="mx-auto italic text-red-800">
          Error loading reviews.
        </ThemeableText>
      </View>
    );

  const { averageRating, reviewCount, ratingCounts } = reviewSummaryQuery.data;
  const latestReviews = latestReviewsQuery.data;

  return (
    <View className="mx-4 mb-10 flex flex-col">
      <ReviewGraph reviewCounts={ratingCounts} />
      {averageRating && reviewCount !== 0 && (
        <View className="flex flex-row justify-center py-2">
          <ThemeableText className="text-lg font-bold">
            {averageRating?.toFixed(2)}
          </ThemeableText>
          <ThemeableText className="text-lg font-semibold">
            {" "}
            ({reviewCount} reviews)
          </ThemeableText>
        </View>
      )}
      <StyledButton
        onPress={() =>
          router.push({
            pathname: "/review/new",
            params: { id: restaurantId },
          })
        }
        text="Add Review"
        buttonStyle="w-1/2 bg-transparent mx-auto"
        textStyle="text-primary font-bold animate-ping"
      />
      {latestReviews.length > 0 && (
        <>
          <ThemeableText className="mb-1 font-bold">
            Latest reviews
          </ThemeableText>
          {latestReviews.map((review) => (
            <ReviewSummary
              review={review}
              restaurantId={restaurantId || ""}
              key={String(review.id)}
            />
          ))}
        </>
      )}
    </View>
  );
}
