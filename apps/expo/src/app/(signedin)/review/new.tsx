import React, { useReducer } from "react";
import { Text, View } from "react-native";
import { StarRating } from "../../../components/star-rating";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StyledTextInput } from "../../../components/inputs/styled-text-input";
import { StyledButton } from "../../../components/button";
import { trpc } from "../../../utils/trpc";
import { useLocalSearchParams } from "expo-router";

interface ReviewInput {
  rating: number;
  content: string;
  isPrivate: boolean;
}

export default function ReviewScreen(): React.ReactElement {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const postReview = trpc.review.postReview.useMutation();

  const [reviewInput, dispatchReviewInput] = useReducer(
    (prevState: ReviewInput, newState: Partial<ReviewInput>) => {
      if (newState.isPrivate !== undefined) {
        return { ...prevState, isPrivate: !prevState.isPrivate };
      }
      return { ...prevState, ...newState };
    },
    {
      rating: 0,
      content: "",
      isPrivate: false,
    },
  );

  function saveReview() {
    if (!id) return;
    postReview.mutateAsync({ placeId: id, ...reviewInput });
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
          onPress={(isPrivate) => dispatchReviewInput({ isPrivate })}
          fillColor="#F191A8"
        />
        <Text className="text-lg">Make review private?</Text>
      </View>

      <StyledButton colorful text="Save" onPress={saveReview} />
    </View>
  );
}
