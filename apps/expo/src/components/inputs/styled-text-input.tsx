import React from "react";
import { TextInput } from "react-native";

interface Props {
  value: string;
  placeholder?: string;
  onChangeText: (newValue: string) => void;
}

export function StyledTextInput(props: Props): React.ReactElement {
  const { value, placeholder, onChangeText } = props;

  return (
    <TextInput
      placeholder={placeholder}
      className="border-1 my-4 h-10 w-full rounded-lg border border-gray-600 px-4"
      value={value}
      onChangeText={onChangeText}
    />
  );
}
