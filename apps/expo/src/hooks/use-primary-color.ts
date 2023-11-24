import { colors } from "~/utils/colors";

/**
 * this will be used in the future to handle light and dark mode,
 * at the moment it's just a wrapper around the primary color
 * @returns hex color string of the primary color
 */
export function usePrimaryColor() {
  return colors.primary;
}
