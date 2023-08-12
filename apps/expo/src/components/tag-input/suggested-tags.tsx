import React from "react";
import { Keyboard, ScrollView, TouchableOpacity, View } from "react-native";

import { api } from "~/utils/api";
import { ThemeableText } from "../themeable/themable-text";

interface Props {
  show: boolean;
  onAdd: (tag: string) => void;
}

export function SuggestedTags(props: Props): React.ReactElement {
  const { show, onAdd } = props;

  const { data: suggestedTags } = api.user.getUserTags.useQuery();

  if (!show || !suggestedTags || suggestedTags.length === 0) return <></>;

  return (
    <ScrollView className="absolute -top-40 z-50 max-h-40 w-full transform overflow-scroll rounded-2xl bg-white shadow-sm shadow-gray-800 dark:bg-gray-800">
      {suggestedTags.map((tag, index) => (
        <TouchableOpacity
          key={index}
          className="flex flex-col px-2"
          onPress={() => {
            onAdd(tag.name);
            Keyboard.dismiss();
          }}
        >
          <ThemeableText className="px-2 py-4">{tag.name}</ThemeableText>
          <View className="mx-auto h-px w-full bg-black" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
