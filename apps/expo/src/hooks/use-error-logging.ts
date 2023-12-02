import Toast from "react-native-toast-message";

import { usePersistedStore } from "~/state/persisted";

export function useErrorLogging() {
  const isDeveloperMode = usePersistedStore((state) => state.isDeveloperMode);

  return (message: string) => {
    if (!isDeveloperMode) return;
    Toast.show({
      type: "error",
      text1: message,
      position: "bottom",
      visibilityTime: 10_000,
    });
  };
}
