import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { formatDateToReadable } from "~/utils/date-format";
import { getLanguageCode } from "~/utils/get-language-code";
import { ThemeableText } from "./themeable/themable-text";

type Props = {
  date: Date;
  handleChangeDate: (date?: Date) => void;
  maxDate?: Date;
};

export function DatePicker(props: Props) {
  const { date, handleChangeDate, maxDate } = props;

  const isAndroid = Platform.OS === "android";

  const [showDatePicker, setShowDatePicker] = useState(false);

  const languageCode = getLanguageCode();

  return (
    <View className="flex flex-col items-start gap-2 pb-8">
      <ThemeableText className="text-lg">Date</ThemeableText>
      {isAndroid && (
        <TouchableOpacity
          className="rounded-lg bg-gray-200 px-3 py-2"
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{formatDateToReadable(date)}</Text>
        </TouchableOpacity>
      )}
      {showDatePicker || !isAndroid ? (
        <View className="-translate-x-4">
          <DateTimePicker
            themeVariant="dark"
            mode="date"
            onChange={(_: DateTimePickerEvent, newDate: Date | undefined) => {
              handleChangeDate(newDate);
              setShowDatePicker(false);
            }}
            value={date}
            maximumDate={maxDate}
            locale={languageCode}
          />
        </View>
      ) : null}
    </View>
  );
}
