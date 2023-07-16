import React from "react";
import { Text, View } from "react-native";

import { formatDateToReadable } from "~/utils/date-format";
import { StarRating } from "../star-rating";

interface ReviewSummary {
  content: string;
  rating: number;
  restaurant: {
    name: string;
    googleId: string;
  };
  updatedAt: Date;
}

interface Props {
  review: ReviewSummary;
}

export function LatestReviewSummary(props: Props): React.ReactElement {
  const { review } = props;

  return (
    <View>
      <View className="flex flex-col justify-start p-2">
        <Text className="text-lg">{review.restaurant.name}</Text>
        <Text className="text-xs">
          {formatDateToReadable(review.updatedAt)}
        </Text>
        <View className="py-2">
          <StarRating
            presetRating={review.rating}
            isEditable={false}
            isSmall={true}
          />
        </View>

        <Text>{review.content}</Text>
      </View>
      <View className="mt-1 h-px w-full bg-gray-100" />
    </View>
  );
}
