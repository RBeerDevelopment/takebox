import React from "react";
import { TextInput, View } from "react-native";

import { IconOnlyButton } from "./icon-button";

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

  function onSubmit() {
    if (value.length > 0 && handleOnSubmit) {
      handleOnSubmit();
    }
  }
  return (
    <View className="h-20 w-full">
      <View className="absolute left-[28px] top-[28px] z-40">
        <IconOnlyButton
          iconName="search"
          iconFont="material"
          onPress={() => {
            return;
          }}
        />
      </View>
      <TextInput
        editable
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        placeholderTextColor={"#666"}
        onChangeText={handleOnChange}
        underlineColorAndroid="transparent"
        className="border-1 m-4 w-11/12 flex-1 rounded-xl border border-gray-100 bg-white p-4 py-3 pl-10 shadow-md"
        returnKeyType="search"
        autoFocus={false}
        onSubmitEditing={onSubmit}
      />
    </View>
  );
}
