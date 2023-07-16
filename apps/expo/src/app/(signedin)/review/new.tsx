import React, { useReducer } from "react";
import { View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { LoadingIndicator } from "~/components/loading-indicator";
import { ThemeableText } from "~/components/themeable/themable-text";
import { ThemeableView } from "~/components/themeable/themable-view";
import { useDarkMode } from "~/hooks/use-dark-mode";
import { StyledButton } from "../../../components/button";
import { StyledTextInput } from "../../../components/inputs/styled-text-input";
import { StarRating } from "../../../components/star-rating";
import { api } from "../../../utils/api";

interface ReviewInput {
  rating: number;
  content: string;
  isTakeout: boolean;
}

export default function ReviewScreen(): React.ReactElement {
  const params = useLocalSearchParams();
  const { goBack } = useNavigation();

  const isDarkMode = useDarkMode();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const postReview = api.review.postReview.useMutation();

  const [reviewInput, dispatchReviewInput] = useReducer(
    (prevState: ReviewInput, newState: Partial<ReviewInput>) => {
      if (newState.isTakeout !== undefined) {
        return { ...prevState, isTakeout: !prevState.isTakeout };
      }
      return { ...prevState, ...newState };
    },
    {
      rating: 3,
      content: "",
      isTakeout: false,
    },
  );

  function saveReview() {
    if (!id) return;
    postReview.mutate(
      { placeId: id, ...reviewInput },
      {
        onSuccess: goBack,
      },
    );
  }

  if (postReview.isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <ThemeableView className="flex h-full w-full flex-col p-6">
      <StarRating
        onChangeRating={(rating) => dispatchReviewInput({ rating })}
      />
      <StyledTextInput
        value={reviewInput.content}
        onChangeText={(content) => dispatchReviewInput({ content })}
      />
      <View className="mb-4 flex flex-row items-center">
        <BouncyCheckbox
          onPress={(isTakeout) => dispatchReviewInput({ isTakeout })}
          fillColor={isDarkMode ? "#FF4FC4" : "#F191A8"}
        />
        <ThemeableText className="-ml-2 text-lg">Takeout</ThemeableText>
      </View>

      <StyledButton colorful text="Save" onPress={saveReview} />
    </ThemeableView>
  );
}
