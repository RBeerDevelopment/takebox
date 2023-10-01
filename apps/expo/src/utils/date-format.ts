import { getLanguageCode } from "./get-language-code";

export function formatDateToReadable(date: Date) {
  const languageCode = getLanguageCode();
  const formatter = new Intl.DateTimeFormat(languageCode, {
    dateStyle: "long",
  });

  return formatter.format(date);
}
