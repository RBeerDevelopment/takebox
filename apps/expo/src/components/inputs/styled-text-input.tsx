import React from "react";
import { TextInput, Text } from "react-native";

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
      {label && <Text className="-mb-4 mt-4 text-lg">{label}</Text>}
      <TextInput
        placeholder={placeholder}
        className="border-1 my-4 h-10 w-full rounded-lg border border-gray-600 px-4"
        value={value}
        onChangeText={onChangeText}
      />
    </>
  );
}
