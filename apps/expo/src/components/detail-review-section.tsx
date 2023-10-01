import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";

import { api } from "~/utils/api";
import { StyledButton } from "./button";
import { ReviewSummary } from "./previous-review/review-summary";
import { ReviewGraph } from "./review-graph";
import { Skeleton } from "./skeleton/skeleton";
import { ThemeableText } from "./themeable/themable-text";

interface Props {
  restaurantId?: string;
}

export function DetailReviewSection(props: Props): React.ReactElement {
  const { restaurantId } = props;

  const router = useRouter();

  const [reviewSummaryQuery, ownReviewsQuery] = api.useQueries((t) => [
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
    t.review.ownReviewsForRestaurant(
      { restaurantId: restaurantId || "" },
      {
        enabled: Boolean(restaurantId),
        staleTime: Infinity,
        refetchOnMount: false,
      },
    ),
  ]);

  const isLoading = reviewSummaryQuery.isLoading || ownReviewsQuery.isLoading;
  const isError = reviewSummaryQuery.isError || ownReviewsQuery.isError;

  if (isLoading) {
    return (
      <View className="mx-6 flex flex-col">
        <ThemeableText className="mb-1 text-lg font-bold">
          Reviews
        </ThemeableText>
        <Skeleton mods="h-6 my-2" />
        <Skeleton mods="h-6 my-2" />
        <Skeleton mods="h-6 my-2" />
      </View>
    );
  }

  if (isError || !reviewSummaryQuery.data || !ownReviewsQuery.data)
    return (
      <View className="mx-6 flex flex-col">
        <ThemeableText className="mb-1 text-lg font-bold">
          Reviews
        </ThemeableText>
        <ThemeableText className="mx-auto italic text-red-800">
          Error loading reviews.
        </ThemeableText>
      </View>
    );

  const { averageRating, reviewCount, ratingCounts } = reviewSummaryQuery.data;
  const ownReviews = ownReviewsQuery.data;

  return (
    <View className="mx-4 mb-10 flex flex-col">
      <ThemeableText className="mb-1 text-lg font-bold">Reviews</ThemeableText>

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
        textStyle="text-primary dark:text-primary-dark font-bold animate-ping"
      />
      {ownReviews.length > 0 && (
        <>
          <ThemeableText className="mb-1 font-bold">My reviews</ThemeableText>
          {ownReviews.map((review) => (
            <ReviewSummary
              review={review}
              restaurantId={restaurantId || ""}
              key={String(review.date)}
            />
          ))}
        </>
      )}
    </View>
  );
}
