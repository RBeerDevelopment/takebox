import React from "react";
import { Switch } from "react-native";

import { colors } from "~/utils/colors";

interface Props {
  value: boolean;
  setValue: (newValue: boolean) => void;
}

const OFF_COLOR = "#767577";
const THUMB_COLOR = "#f4f3f4";
const IOS_BACKGROUND_COLOR = "#3e3e3e";

export function ThemeableSwitch(props: Props): React.ReactElement {
  const { value, setValue } = props;
  return (
    <Switch
      trackColor={{ false: OFF_COLOR, true: colors.primary }}
      thumbColor={THUMB_COLOR}
      ios_backgroundColor={IOS_BACKGROUND_COLOR}
      onValueChange={setValue}
      value={value}
    />
  );
}
