import { Alert } from "react-native";

type AlertProps = {
  title: string;
  message: string;
  positiveButton: {
    text: string;
    onPress: () => void;
    isDestructive: boolean;
  };
};

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
