import { locale } from "expo-localization";

export function getLanguageCode() {
  return locale ?? "en-US";
}
