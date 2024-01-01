import React, { useReducer } from "react";
import { View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { showErrorToast } from "~/utils/interactions/show-toast";
import { uploadImage } from "~/utils/upload-image";
import { StyledButton } from "~/components/button";
import { DatePicker } from "~/components/date-picker";
import { ImagePicker } from "~/components/image-picker";
import { StyledTextInput } from "~/components/inputs/styled-text-input";
import { LoadingIndicator } from "~/components/loading-indicator";
import { StarRating } from "~/components/star-rating";
import { TagInput } from "~/components/tag-input/tag-input";
import { ThemeableText } from "~/components/themeable/themable-text";
import { useCreateReview } from "~/hooks/queries/use-create-review";
import { usePrimaryColor } from "~/hooks/use-primary-color";

interface ReviewInput {
  rating: number;
  content: string;
  isTakeout: boolean;
  date: Date;
  tags: string[];
  imageUri: string | null;
}

export default function ReviewScreen(): React.ReactElement {
  const params = useLocalSearchParams();
  const { goBack } = useNavigation();

  const today = new Date();

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
      rating: 5,
      content: "",
      tags: [],
      isTakeout: false,
      date: today,
      imageUri: null,
    },
  );

  function handleCreateReview() {
    if (!id) return;
    createReview.mutate(
      {
        placeId: id,
        ...reviewInput,
        hasImage: Boolean(reviewInput.imageUri),
      },
      {
        onSuccess: ({ s3UploadUrl }) => {
          if (!s3UploadUrl || reviewInput.imageUri === null) {
            goBack();
            return;
          }
          uploadImage(reviewInput.imageUri, s3UploadUrl)
            .then(goBack)
            .catch((e: unknown) => {
              console.error(e);
              showErrorToast("Error uploading image. Please try again.");
            });
        },
      },
    );
  }

  if (createReview.isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <KeyboardAwareScrollView
      className="flex h-full w-full flex-col overflow-y-scroll bg-slate-950 px-2"
      keyboardShouldPersistTaps="handled"
    >
      <ImagePicker
        imageUri={reviewInput.imageUri}
        onChangeImageUri={(imageUri) => dispatchReviewInput({ imageUri })}
      />
      <StarRating
        onChangeRating={(rating) => dispatchReviewInput({ rating })}
      />
      <StyledTextInput
        label="Review"
        value={reviewInput.content}
        multiline
        placeholder="Write a review..."
        onChangeText={(content) => dispatchReviewInput({ content })}
      />
      <TagInput
        title="Tags"
        tags={reviewInput.tags}
        onChange={(newTags) => {
          dispatchReviewInput({
            tags: newTags.map((tag) => tag.trim().toLowerCase()),
          });
        }}
      />
      <DatePicker
        date={reviewInput.date}
        handleChangeDate={(newDate) => dispatchReviewInput({ date: newDate })}
        maxDate={today}
      />
      <View className="mb-4 flex flex-row items-center">
        <BouncyCheckbox
          onPress={(isTakeout) => dispatchReviewInput({ isTakeout })}
          fillColor={primaryColor}
        />
        <ThemeableText className="-ml-2 text-lg">Takeout</ThemeableText>
      </View>

      <StyledButton
        colorful
        text="Save"
        onPress={handleCreateReview}
        buttonStyle="mb-20"
      />
    </KeyboardAwareScrollView>
  );
}
