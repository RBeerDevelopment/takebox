import React from "react";
import { View } from "react-native";

import { formatDateToReadable } from "~/utils/date-format";
import { StarRating } from "../star-rating";
import { ThemeableText } from "../themeable/themable-text";
import { ThemeableView } from "../themeable/themable-view";

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
    <View className="w-screen">
      <ThemeableView className="flex flex-col justify-start p-2 dark:bg-slate-950">
        <ThemeableText className="-ml-1 text-lg font-semibold dark:text-white">
          {review.restaurant.name}
        </ThemeableText>
        <ThemeableText className="dark:text-white">
          {formatDateToReadable(review.updatedAt)}
        </ThemeableText>
        <View className="py-2">
          <StarRating presetRating={review.rating} isEditable={false} isSmall />
        </View>

        <ThemeableText className="dark:text-white">
          {review.content}
        </ThemeableText>
      </ThemeableView>
      <View className="mr-8 mt-1 h-px bg-gray-100 dark:bg-gray-700" />
    </View>
  );
}
