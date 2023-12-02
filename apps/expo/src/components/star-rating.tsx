import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "~/utils/colors";

const starRatingOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

type StarIconType = "star" | "star-outline" | "star-half-full";

interface Props {
  presetRating?: number;
  isSmall?: boolean;
  onChangeRating?: (rating: number) => void;
  isEditable?: boolean;
}

export function StarRating(props: Props): React.ReactElement {
  const { onChangeRating, isEditable = true, presetRating, isSmall } = props;

  const [rating, setRating] = useState<number>(
    presetRating !== null && presetRating !== undefined ? presetRating : 3,
  );

  const heightStyle = isSmall ? "justify-start" : "h-30 justify-center";
  return (
    <View className={`${heightStyle} flex flex-row`}>
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

              if (onChangeRating) {
                onChangeRating(newRating);
              }

              if (!isEditable) return;

              setRating(newRating);
            }}
            className="mx-1"
          >
            <MaterialCommunityIcons
              name={iconName}
              size={isSmall ? 28 : 40}
              color={colors.primary}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
