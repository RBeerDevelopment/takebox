import React from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";

import { api } from "~/utils/api";
import { StyledButton } from "./button";
import { Skeleton } from "./skeleton/skeleton";
import { StarRating } from "./star-rating";

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
        <Text className="mb-1 text-lg font-bold">Reviews</Text>
        <Skeleton mods="h-6 my-2" />
        <Skeleton mods="h-6 my-2" />
        <Skeleton mods="h-6 my-2" />
      </View>
    );
  }

  if (isError || !reviews)
    return (
      <View className="mx-6 flex flex-col">
        <Text className="mb-1 text-lg font-bold">Reviews</Text>
        <Text className="mx-auto italic text-red-800">
          Error loading reviews.
        </Text>
      </View>
    );

  const { averageRating, reviewCount } = reviews;

  return (
    <View className="mx-6 flex flex-col">
      <Text className="mb-1 text-lg font-bold">Reviews</Text>
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
          <Text className="font-bold">{averageRating}</Text>
          <Text className="font-semibold"> ({reviewCount} reviews)</Text>
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
    </View>
  );
}
