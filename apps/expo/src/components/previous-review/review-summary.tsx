import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { formatDateToReadable } from "~/utils/date-format";
import { useDeleteReview } from "~/hooks/queries/use-delete-review";
import { IconComponent } from "../icon-button/icon-component";
import { StarRating } from "../star-rating";
import { ThemeableText } from "../themeable/themable-text";
import { ThemeableView } from "../themeable/themable-view";

interface ReviewSummaryInput {
  id: string;
  content: string;
  rating: number;
  restaurant: {
    name: string;
    googleId: string;
  };
  updatedAt: Date;
}

interface Props {
  review: ReviewSummaryInput;
  restaurantId?: string;
}

export function ReviewSummary(props: Props): React.ReactElement {
  const { review, restaurantId } = props;

  const deleteReview = useDeleteReview(restaurantId || "", review.id);

  function renderRightActions() {
    return (
      <TouchableOpacity
        className="flex h-full w-1/3 flex-col items-center justify-center bg-red-500 pr-4"
        onPress={deleteReview}
      >
        <IconComponent
          iconName="delete"
          iconFont="material"
          iconColor="white"
        ></IconComponent>
        <Text className="pt-1 font-bold text-white">Delete</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View className="w-screen">
      <Swipeable renderRightActions={renderRightActions}>
        <ThemeableView className="flex flex-col justify-start p-2 dark:bg-slate-950">
          <ThemeableText className="-ml-1 text-lg font-semibold dark:text-white">
            {review.restaurant.name}
          </ThemeableText>
          <ThemeableText className="dark:text-white">
            {formatDateToReadable(review.updatedAt)}
          </ThemeableText>
          <View className="py-2">
            <StarRating
              presetRating={review.rating}
              isEditable={false}
              isSmall
            />
          </View>

          <ThemeableText className="dark:text-white">
            {review.content}
          </ThemeableText>
        </ThemeableView>
      </Swipeable>
    </View>
  );
}
