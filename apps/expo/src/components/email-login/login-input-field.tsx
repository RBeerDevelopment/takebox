import { TextInput } from "react-native";

interface LoginInputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  [key: string]: unknown;
}
export function LoginInputField(props: LoginInputFieldProps) {
  const { value, onChangeText, placeholder, ...rest } = props;

  return (
    <TextInput
      className="mx-4 my-1 w-11/12 rounded-lg bg-white px-4 py-4 text-black"
      value={value}
      placeholder={placeholder}
      placeholderTextColor="black"
      onChangeText={onChangeText}
      {...rest}
    />
  );
}
