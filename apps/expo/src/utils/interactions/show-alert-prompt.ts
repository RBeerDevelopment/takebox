import { Alert, type AlertType } from "react-native";

type AlertProps = {
  title: string;
  message: string;
  callback: (content: string) => void;
  inputType?: AlertType;
  defaultValue?: string;
  keyboardType?: string;
};

export function showAlertPrompt(props: AlertProps) {
  Alert.prompt(
    props.title,
    props.message,
    props.callback,
    props.inputType ?? "plain-text",
    props.defaultValue ?? "",
    props.keyboardType ?? "default",
    { userInterfaceStyle: "dark" },
  );
}
