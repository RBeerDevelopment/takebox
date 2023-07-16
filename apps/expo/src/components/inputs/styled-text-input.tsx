import React from "react";
import { Text, TextInput } from "react-native";

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
        multiline={true}
        className="border-1 my-4  h-16 w-full rounded-lg border border-gray-300 bg-white px-4"
        value={value}
        onChangeText={onChangeText}
      />
    </>
  );
}
