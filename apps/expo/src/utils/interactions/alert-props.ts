import { type AlertType } from "react-native";

type BaseProps = {
  title: string;
  message: string;
};

export type AlertProps = BaseProps & {
  positiveButton: {
    text: string;
    onPress: () => void;
    isDestructive: boolean;
  };
};

export type PromptAlertProps = BaseProps & {
  callback: (content: string) => void;
  inputType?: AlertType;
  defaultValue?: string;
  keyboardType?: string;
};
