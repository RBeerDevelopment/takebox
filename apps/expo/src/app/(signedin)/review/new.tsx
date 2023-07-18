import React, { useReducer } from "react";
import { View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { LoadingIndicator } from "~/components/loading-indicator";
import { ThemeableText } from "~/components/themeable/themable-text";
import { ThemeableView } from "~/components/themeable/themable-view";
import { useCreateReview } from "~/hooks/queries/use-create-review";
import { usePrimaryColor } from "~/hooks/use-primary-color";
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

  const primaryColor = usePrimaryColor();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const createReview = useCreateReview(id);

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

  function handleCreateReview() {
    if (!id) return;
    createReview.mutate({ placeId: id, ...reviewInput }, { onSuccess: goBack });
  }

  if (createReview.isLoading) {
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
          fillColor={primaryColor}
        />
        <ThemeableText className="-ml-2 text-lg">Takeout</ThemeableText>
      </View>

      <StyledButton colorful text="Save" onPress={handleCreateReview} />
    </ThemeableView>
  );
}
