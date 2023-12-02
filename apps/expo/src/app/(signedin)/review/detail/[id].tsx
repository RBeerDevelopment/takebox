import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { useGlobalSearchParams, useRouter } from "expo-router";

import { api } from "~/utils/api";
import { blurhash } from "~/utils/blur-hash";
import { formatDateToReadable } from "~/utils/date-format";
import { secInMs } from "~/utils/time-formatting/sec-in-ms";
import { CentralItem } from "~/components/central-item";
import { LoadingIndicator } from "~/components/loading-indicator";
import { StarRating } from "~/components/star-rating";
import { TagList } from "~/components/tag-input/tag-list";
import { ThemeableText } from "~/components/themeable/themable-text";
import { ThemeableView } from "~/components/themeable/themable-view";

export default function ReviewDetailModal(): React.ReactElement {
  const { id } = useGlobalSearchParams();

  const router = useRouter();

  const {
    data: review,
    isLoading,
    isError,
  } = api.review.reviewById.useQuery(
    { id: id as string },
    { enabled: Boolean(id), staleTime: secInMs(30), refetchOnMount: false },
  );

  if (!id) {
    return (
      <CentralItem>
        <ThemeableText>Could not find id.</ThemeableText>
      </CentralItem>
    );
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError || !review) {
    return (
      <CentralItem>
        <ThemeableText className="italic text-red-800">
          Could not find review.
        </ThemeableText>
      </CentralItem>
    );
  }

  const { imageUrl } = review;

  return (
    <ThemeableView className="flex h-full flex-col justify-start gap-1 px-2 py-3">
      <TouchableOpacity
        onPress={() => {
          router.push("../");
          setTimeout(
            () => router.push(`/restaurant/${review.restaurant.id}`),
            50,
          );
        }}
      >
        <ThemeableText className="text-2xl font-semibold">
          {review.restaurant.name}
        </ThemeableText>
      </TouchableOpacity>
      <ThemeableText>{review.user.username}</ThemeableText>
      <ThemeableText>{formatDateToReadable(review.date)}</ThemeableText>
      <View className="py-2">
        <StarRating presetRating={review.rating} isEditable={false} />
      </View>
      <ThemeableText className="pr-2 text-lg">{review.content}</ThemeableText>
      <View className="px-1">
        <TagList tags={review.tags} />
      </View>
      <View className="flex items-center p-3">
        {imageUrl ? (
          <Image
            alt="Review Image"
            className="aspect-square w-full rounded-xl"
            source={imageUrl}
            placeholder={blurhash}
            contentFit="cover"
          />
        ) : null}
      </View>
    </ThemeableView>
  );
}
