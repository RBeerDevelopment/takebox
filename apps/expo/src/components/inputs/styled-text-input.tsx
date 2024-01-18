import React from "react";
import { TextInput, type TextInputProps } from "react-native";

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
  autoCapitalize?: TextInputProps["autoCapitalize"];
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
    autoCapitalize = "sentences",
    onFocus = () => {
      return;
    },
    onBlur = () => {
      return;
    },
  } = props;

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
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        multiline={multiline}
        placeholderTextColor="#b1b1b1"
        className={cn(
          " my-4 w-full rounded-lg bg-gray-900 px-3 text-white",
          multiline ? "h-16" : "h-12",
          className,
        )}
        value={value}
        onChangeText={onChangeText}
      />
    </>
  );
}
