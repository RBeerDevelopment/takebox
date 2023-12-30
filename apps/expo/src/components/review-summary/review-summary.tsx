import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Link } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

import { type ReviewListItem } from "@flavoury/api/src/db/review/review-list-item";

import { formatDateToReadable } from "~/utils/date-format";
import { useDeleteReview } from "~/hooks/queries/use-delete-review";
import { IconComponent } from "../icon-button/icon-component";
import { StarRating } from "../star-rating";
import { ThemeableText } from "../themeable/themable-text";
import { ThemeableView } from "../themeable/themable-view";

interface Props {
  review: ReviewListItem;
  restaurantId?: string;
  showUsername?: boolean;
  allowDelete?: boolean;
}

export function ReviewSummary(props: Props): React.ReactElement {
  const {
    review,
    restaurantId,
    showUsername = true,
    allowDelete = false,
  } = props;

  const deleteReview = useDeleteReview(restaurantId || "", review.id);

  function handleOnDelete() {
    Alert.alert(
      "Delete Review",
      "Do you really want to delete this review? This cannot be undone.",
      [
        { text: "Delete", onPress: deleteReview },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true },
    );
  }

  function renderRightActions() {
    return (
      <TouchableOpacity
        className="flex h-full w-1/3 flex-col items-center justify-center bg-red-500 pr-4"
        onPress={handleOnDelete}
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
    <TouchableOpacity>
      <Swipeable
        renderRightActions={allowDelete ? renderRightActions : undefined}
      >
        <Link
          href={`/review/detail/${review.id}`}
          onPress={() => console.log(`/review/detail/${review.id}`)}
        >
          <ThemeableView className="flex flex-col justify-start gap-1 bg-slate-950 px-2 py-2">
            <ThemeableText className="-ml-0.5 text-lg font-semibold">
              {review.restaurant.name}
            </ThemeableText>
            {showUsername ? (
              <ThemeableText>{review.user.username}</ThemeableText>
            ) : null}
            <ThemeableText>{formatDateToReadable(review.date)}</ThemeableText>
            <View className="py-2">
              <StarRating
                presetRating={review.rating}
                isEditable={false}
                isSmall
              />
            </View>

            {review.content.length > 0 ? (
              <ThemeableText className="pr-2">{review.content}</ThemeableText>
            ) : null}
          </ThemeableView>
        </Link>
      </Swipeable>
    </TouchableOpacity>
  );
}
