import { TextInput, View } from "react-native";

import { ThemeableText } from "../themeable/themable-text";

interface LoginInputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  placeholder?: string;
  [key: string]: unknown;
}
export function LoginInputField(props: LoginInputFieldProps) {
  const { value, onChangeText, label, placeholder, ...rest } = props;

  return (
    <View className="mb-3 flex w-full flex-col">
      <ThemeableText className="text-lg">{label}</ThemeableText>
      <TextInput
        className="w-full rounded-lg border border-gray-100 bg-slate-800 px-3 py-2 text-lg text-white"
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        textAlignVertical="center"
        {...rest}
      />
    </View>
  );
}
