import React from "react";
import { View } from "react-native";

import { type RatingCountMap } from "@flavoury/api/src/utils/rating-count-map";

interface Props {
  reviewCounts: RatingCountMap;
}

export function ReviewGraph(props: Props): React.ReactElement {
  const { reviewCounts } = props;

  const maxCount = Math.max(...Object.values(reviewCounts));

  return (
    <View className="flex h-20 flex-row items-end justify-center gap-1">
      {Object.values(reviewCounts).map((count, idx) => {
        const height = (count / maxCount) * 95 + 1;
        return (
          <View
            key={idx}
            style={{ height: `${height}%` }}
            className={`dark:bg-primary-dark w-[calc(7%)] bg-primary`}
          />
        );
      })}
    </View>
  );
}
