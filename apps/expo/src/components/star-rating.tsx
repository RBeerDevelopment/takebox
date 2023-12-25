import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "~/utils/colors";
import { cn } from "~/utils";

const starRatingOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

type StarIconType = "star" | "star-outline" | "star-half-full";

interface Props {
  presetRating?: number;
  isSmall?: boolean;
  onChangeRating?: (rating: number) => void;
  isEditable?: boolean;
}

const STAR_WIDTH = 53;

export function StarRating(props: Props): React.ReactElement {
  const { onChangeRating, isEditable = true, presetRating, isSmall } = props;

  const [rating, setRating] = useState<number>(
    presetRating !== null && presetRating !== undefined ? presetRating : 3,
  );

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .minDistance(20)
    .onUpdate((event) => {
      if (!isEditable) return;
      const { x } = event;

      const newRating = Math.min(Math.floor(((x + 20) / STAR_WIDTH) * 2), 10);

      if (newRating !== rating) {
        setRating(newRating);
      }
    });
  return (
    <View
      className={cn(
        "flex w-fit flex-row justify-center",
        isSmall && "justify-start",
      )}
    >
      <GestureDetector gesture={panGesture}>
        <View className="flex flex-row">
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
                className="mx-1"
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
              >
                <MaterialCommunityIcons
                  name={iconName}
                  size={isSmall ? 28 : 45}
                  color={colors.primary}
                />
              </Pressable>
            );
          })}
        </View>
      </GestureDetector>
    </View>
  );
}
