import React from "react";
import { TextInput } from "react-native";

import { useDarkMode } from "~/hooks/use-dark-mode";
import { cn } from "~/utils";
import { ThemeableText } from "../themeable/themable-text";

interface Props {
  value: string;
  placeholder?: string;
  label?: string;
  onChangeText: (newValue: string) => void;
  multiline?: boolean;
  className?: string;
  onEnterPress?: () => void;
  autoCorrect?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function StyledTextInput(props: Props): React.ReactElement {
  const {
    value,
    placeholder,
    onChangeText,
    label,
    multiline = false,
    className = "",
    onEnterPress,
    autoCorrect = true,
    onFocus = () => {
      return;
    },
    onBlur = () => {
      return;
    },
  } = props;

  const isDarkMode = useDarkMode();

  return (
    <>
      {label && (
        <ThemeableText className="-mb-2 mt-4 text-lg">{label}</ThemeableText>
      )}
      <TextInput
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmitEditing={() => {
          if (!onEnterPress) return;
          onEnterPress();
        }}
        autoCorrect={autoCorrect}
        placeholder={placeholder}
        multiline={multiline}
        placeholderTextColor={isDarkMode ? "#b1b1b1" : "#212121"}
        className={cn(
          " my-4 w-full rounded-lg bg-gray-200 p-2 dark:bg-gray-900 dark:text-white",
          multiline ? "h-16" : "h-12",
          className,
        )}
        value={value}
        onChangeText={onChangeText}
      />
    </>
  );
}
