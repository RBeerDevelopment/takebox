import React from "react";
import { TextInput } from "react-native";

import { ThemeableText } from "../themeable/themable-text";

interface Props {
  value: string;
  placeholder?: string;
  label?: string;
  onChangeText: (newValue: string) => void;
}

export function StyledTextInput(props: Props): React.ReactElement {
  const { value, placeholder, onChangeText, label } = props;

  return (
    <>
      {label && (
        <ThemeableText className="-mb-4 mt-4 text-lg">{label}</ThemeableText>
      )}
      <TextInput
        placeholder={placeholder}
        multiline={true}
        className="border-1 px- my-4 h-16 w-full rounded-lg border border-gray-300 bg-white dark:border-gray-900 dark:bg-gray-900 dark:text-white"
        value={value}
        onChangeText={onChangeText}
      />
    </>
  );
}
