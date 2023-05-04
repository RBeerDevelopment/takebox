import React from "react";
import { TextInput, View } from "react-native";

interface Props {
  value: string;
  placeholder?: string;
  maxLength?: number;
  handleOnChange: (value: string) => void;
  handleOnSubmit?: () => void;
}

export function SearchInput(props: Props): React.ReactElement {
  const {
    value,
    placeholder,
    handleOnChange,
    handleOnSubmit,
    maxLength = 30,
  } = props;
  return (
    <View className="h-20 w-full">
      <TextInput
        editable
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChangeText={handleOnChange}
        underlineColorAndroid="transparent"
        className="border-1 m-4 w-11/12 flex-1 rounded-full border bg-white p-4 py-3 shadow-lg"
        returnKeyType="search"
        onSubmitEditing={handleOnSubmit}
      />
    </View>
  );
}
