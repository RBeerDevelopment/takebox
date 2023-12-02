import Toast from "react-native-toast-message";

import { api } from "~/utils/api";
import { usePersistedStore } from "~/state/persisted";

export function useErrorLogging() {
  const isDeveloperMode = usePersistedStore((state) => state.isDeveloperMode);
  const { mutate: logError } = api.log.logError.useMutation();

  return (message: string) => {
    logError({ message });
    if (!isDeveloperMode) return;
    Toast.show({
      type: "error",
      text1: message,
      position: "bottom",
      visibilityTime: 10_000,
    });
  };
}
