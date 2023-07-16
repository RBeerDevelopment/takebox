import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";

import { api } from "~/utils/api";
import { StyledButton } from "./button";
import { Skeleton } from "./skeleton/skeleton";
import { StarRating } from "./star-rating";
import { ThemeableText } from "./themeable/themable-text";

interface Props {
  restaurantId?: string;
}

export function DetailReviewSection(props: Props): React.ReactElement {
  const { restaurantId } = props;

  const router = useRouter();

  const {
    data: reviews,
    isLoading,
    isError,
  } = api.review.reviewSummary.useQuery(
    {
      placeId: restaurantId as string,
    },
    { enabled: Boolean(restaurantId), staleTime: Infinity },
  );

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

  if (isError || !reviews)
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

  const { averageRating, reviewCount } = reviews;

  return (
    <View className="mx-6 flex flex-col">
      <ThemeableText className="mb-1 text-lg font-bold">Reviews</ThemeableText>
      <StarRating
        onChangeRating={() =>
          router.push({
            pathname: "/review/new",
            params: { id: restaurantId },
          })
        }
        presetRating={averageRating ? Math.round(averageRating * 2) : 0}
        isEditable={false}
      />
      {averageRating && reviewCount !== 0 && (
        <View className="flex flex-row justify-center py-2">
          <ThemeableText className="font-bold">{averageRating}</ThemeableText>
          <ThemeableText className="font-semibold">
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
    </View>
  );
}
