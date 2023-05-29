import React, { useState } from "react";
import { View, Text } from "react-native";
import { StarRating } from "./star-rating";
import { Link, useNavigation, useRouter } from "expo-router";

interface Props {
  avgRating: number;
  ratingCount: number;
}

export function DetailReviewSection(props: Props): React.ReactElement {
  const { avgRating, ratingCount } = props;

  const router = useRouter();

  return (
    <View className="mx-6 flex flex-col">
      <Text className="mb-4 text-lg font-bold">Reviews</Text>
      {avgRating && ratingCount !== 0 && (
        <View className="flex flex-row p-4">
          <Text>Rating: {avgRating}</Text>
          <Text>({ratingCount} reviews)</Text>
        </View>
      )}
      <Link href="/review/new">
        <StarRating onChangeRating={() => router.push("/review/new")} />
      </Link>
    </View>
  );
}
