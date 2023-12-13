import { TextInput, View, type TextInputProps } from "react-native";

import { ThemeableText } from "../themeable/themable-text";

type LoginInputFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  placeholder?: string;
} & TextInputProps;
export function LoginInputField(props: LoginInputFieldProps) {
  const { value, onChangeText, label, placeholder, ...rest } = props;

  return (
    <View className="mb-3 flex w-full flex-col">
      <ThemeableText className="text-lg">{label}</ThemeableText>
      <TextInput
        value={value}
        style={{
          padding: 8,
          height: 40,
          width: "100%",
          backgroundColor: "#1E293A",
          borderRadius: 8,
          fontSize: 16,
          color: "white",
        }}
        placeholderTextColor="#AAAAAA"
        placeholder={placeholder}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
}
