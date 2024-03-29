import { Alert } from "react-native";

import { type AlertProps } from "./alert-props";

export function showAlert(props: AlertProps) {
  Alert.alert(props.title, props.message, [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: props.positiveButton.text,
      style: props.positiveButton.isDestructive ? "destructive" : "default",
      onPress: props.positiveButton.onPress,
    },
  ]);
}
