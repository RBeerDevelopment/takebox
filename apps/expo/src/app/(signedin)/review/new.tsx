import React, { useReducer } from "react";
import { Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { LoadingIndicator } from "~/components/loading-indicator";
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
    <View className="flex h-full w-full flex-col p-6">
      <StarRating
        onChangeRating={(rating) => dispatchReviewInput({ rating })}
      />
      <StyledTextInput
        label="Review content"
        value={reviewInput.content}
        onChangeText={(content) => dispatchReviewInput({ content })}
      />
      <View className="flex flex-row items-center">
        <BouncyCheckbox
          onPress={(isTakeout) => dispatchReviewInput({ isTakeout })}
          fillColor="#F191A8"
        />
        <Text className="text-lg">Takeout</Text>
      </View>

      <StyledButton colorful text="Save" onPress={saveReview} />
    </View>
  );
}
