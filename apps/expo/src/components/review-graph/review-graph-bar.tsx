import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { usePrimaryColor } from "~/hooks/use-primary-color";

interface Props {
  height: number;
}

export function ReviewGraphBar(props: Props): React.ReactElement {
  const { height } = props;

  const bgColor = usePrimaryColor();
  console.log({ bgColor });

  const animatedHeight = useSharedValue<number>(0);

  useEffect(() => {
    animatedHeight.value = withTiming(height, { duration: 800 });
  }, [height, animatedHeight]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });

  return (
    <View className="mx-1 w-[calc(7%)] flex-row" style={{ height: height }}>
      {/* for some reason color through tailwind isn't working here */}
      <Animated.View
        style={[animatedStyle, { backgroundColor: bgColor }]}
        className="w-full self-end"
      />
    </View>
  );
}
