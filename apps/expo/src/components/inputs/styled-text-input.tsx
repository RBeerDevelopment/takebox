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
        className="my-4 h-16 w-full rounded-lg bg-gray-200 p-2 dark:bg-gray-900 dark:text-white"
        value={value}
        onChangeText={onChangeText}
      />
    </>
  );
}
