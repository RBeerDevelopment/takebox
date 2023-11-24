import React from "react";
import { View } from "react-native";

import { type RatingCountMap } from "@flavoury/api/src/utils/rating-count-map";

import { ReviewGraphBar } from "./review-graph-bar";

interface Props {
  reviewCounts: RatingCountMap;
}

export function ReviewGraph(props: Props): React.ReactElement {
  const { reviewCounts } = props;

  console.log({ reviewCounts });

  const maxCount = Math.max(...Object.values(reviewCounts));

  return (
    <View className="mt-4 flex h-20 w-full flex-row items-end justify-center">
      {Object.values(reviewCounts).map((count, idx) => {
        const heightInPx = (count / (maxCount || 1)) * 76 + 4;
        return <ReviewGraphBar height={heightInPx} key={idx} />;
      })}
    </View>
  );
}
