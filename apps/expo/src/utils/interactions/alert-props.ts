type AlertProps = {
  title: string;
  message: string;
  positiveButton: {
    text: string;
    onPress: () => void;
    isDestructive: boolean;
  };
};
