import { Alert } from "react-native";

import { type PromptAlertProps } from "./alert-props";

export function showAlertPrompt(props: PromptAlertProps) {
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
