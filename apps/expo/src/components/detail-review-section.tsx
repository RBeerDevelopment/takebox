import React from "react";
import { View, Text } from "react-native";
import { StarRating } from "./star-rating";
import { useRouter } from "expo-router";

interface Props {
  avgRating?: number | null;
  ratingCount?: number | null;
  restaurantId?: string;
}

export function DetailReviewSection(props: Props): React.ReactElement {
  const { restaurantId, avgRating, ratingCount } = props;

  const router = useRouter();

  return (
    <View className="mx-6 flex flex-col">
      <Text className="mb-4 text-lg font-bold">Reviews</Text>
      {avgRating && ratingCount !== 0 && (
        <View className="flex flex-row p-4">
          <Text>Rating: {avgRating}</Text>
          <Text>({ratingCount} reviews)</Text>
        </View>
      )}
      <StarRating
        onChangeRating={() =>
          router.push({
            pathname: "/review/new",
            params: { id: restaurantId },
          })
        }
        isEditable={false}
      />
    </View>
  );
}
