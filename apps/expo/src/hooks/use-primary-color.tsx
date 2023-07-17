import { colors } from "~/utils/colors";
import { useDarkMode } from "./use-dark-mode";

export function usePrimaryColor() {
  const isDarkMode = useDarkMode();
  return isDarkMode ? colors.primary.dark : colors.primary.DEFAULT;
}
