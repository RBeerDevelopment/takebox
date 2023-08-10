import React from "react";
import { TextInput } from "react-native";

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
  } = props;

  return (
    <>
      {label && (
        <ThemeableText className="-mb-2 mt-4 text-lg">{label}</ThemeableText>
      )}
      <TextInput
        onSubmitEditing={() => {
          if (!onEnterPress) return;
          onEnterPress();
        }}
        autoCorrect={autoCorrect}
        placeholder={placeholder}
        multiline={multiline}
        className={cn(
          "my-4 w-full rounded-lg bg-gray-200 p-2 dark:bg-gray-900 dark:text-white",
          multiline ? "h-16" : "h-12",
          className,
        )}
        value={value}
        onChangeText={onChangeText}
      />
    </>
  );
}
