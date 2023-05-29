import React, { useState } from "react";
import { Pressable, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const starRatingOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

type StarIconType = "star" | "star-outline" | "star-half-full";

interface Props {
  onChangeRating?: (rating: number) => void;
}

export function StarRating(props: Props): React.ReactElement {
  const { onChangeRating } = props;

  const [rating, setRating] = useState<number>(3);

  return (
    <View className="h-30 flex w-full flex-row justify-center">
      {starRatingOptions.map((option) => {
        if (option % 2 !== 0 || option === 10) {
          return;
        }

        let iconName: StarIconType = "star-outline";

        if (option < rating) {
          iconName = "star";
        }

        if (option === rating - 1) {
          iconName = "star-half-full";
        }

        return (
          <Pressable
            key={option}
            onPress={() => {
              let newRating = option + 2;

              if (option === rating - 2) {
                newRating = option + 1;
              }
              setRating(newRating);

              if (!onChangeRating) return;

              onChangeRating(newRating);
            }}
            className="mx-1"
          >
            <MaterialCommunityIcons name={iconName} size={40} color="#F191A8" />
          </Pressable>
        );
      })}
    </View>
  );
}
